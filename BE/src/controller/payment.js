import { sendResponse } from "../utils";
import { PaymentModel } from "../models";
import { PaymentValidate } from "../validate";
import { validateMiddleware } from "../middleware";
import axios from "axios";
import crypto from 'crypto';
import config from 'config';
import qs from 'qs';
import dateFormat from 'dateformat';


/**
 * 
 * Hàm createPaymentUrl trong đoạn mã của bạn có nhiệm vụ tạo URL thanh toán 
 * và chuyển hướng người dùng đến cổng thanh toán VNPAY để thực hiện thanh toán
 */
export const createPaymentUrl = (req, res) => {
  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const tmnCode = config.get('vnp_TmnCode');
  const secretKey = config.get('vnp_HashSecret');
  const vnpUrl = config.get('vnp_Url');
  const returnUrl = config.get('vnp_ReturnUrl');

  const date = new Date();
  const createDate = dateFormat(date, 'yyyymmddHHmmss');
  const orderId = dateFormat(date, 'HHmmss');
  const amount = req.body.amount;
  const bankCode = req.body.bankCode;

  const orderInfo = req.body.orderDescription;
  const orderType = req.body.orderType;
  let locale = req.body.language;
  if (!locale || locale === '') {
    locale = 'vn';
  }
  const currCode = 'VND';

  const vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  const sortedParams = Object.keys(vnp_Params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = vnp_Params[key];
      return acc;
    }, {});

  const signData = qs.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  vnp_Params['vnp_SecureHash'] = signed;
  const redirectUrl = `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;

  res.redirect(redirectUrl);
};

// khi thanh toán thành công hoặc thất bại
export const vnpayCallback = async (req, res) => {
  try {
    const query = req.query;
    const isValid = vnp.verifySignature(query);

    if (isValid) {
      // Xử lý đơn hàng thành công
      const orderId = query.vnp_TxnRef;
      const amount = query.vnp_Amount;

      // Lưu vào MongoDB
      const order = new PaymentModel({
        amount: amount,
        paymentStatus: 'Thành công', // Hoặc trạng thái tương ứng
        // Các trường khác của đơn hàng
        ...req.body
      });

      await order.save();

      // Gửi email xác nhận
      const emailOptions = {
        to: 'recipient@example.com', // Địa chỉ email của người nhận
        subject: 'Xác nhận thanh toán',
        text: `Thanh toán thành công cho đơn hàng ${orderId}.`,
      };

      await sendEmail(emailOptions);

      // Trả về phản hồi cho người dùng
      sendResponse(res, 200, 'Payment success');
    } else {
      // Xử lý đơn hàng không hợp lệ
      sendResponse(res, 400, 'Invalid payment');
    }
  } catch (error) {
    console.error('Error processing VNPAY callback:', error);
    sendResponse(res, 500, 'Internal Server Error');
  }
};

