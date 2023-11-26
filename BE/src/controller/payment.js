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
  try {
    // Kiểm tra thông tin đầu vào
    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Số tiền không hợp lệ' });
    }

    const bankCode = req.body.bankCode || '';
    const orderInfo = req.body.orderDescription || '';
    const orderType = req.body.orderType || '';
    let locale = req.body.language || 'vn';

    // Chuyển đổi giá trị số tiền
    const vnp_Amount = amount * 100;

    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const tmnCode = 'WMVBW0IU';
    const secretKey = 'GAFTZWCBLKWZEZTBZCOOQEZHWAVCLNHS';
    const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const returnUrl = 'http://localhost:5173/';

    const date = new Date();
    const createDate = dateFormat(date, 'yyyymmddHHmmss');
    const orderId = dateFormat(date, 'HHmmss');

    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: vnp_Amount,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    // Kiểm tra và thêm các giá trị không bắt buộc
    if (bankCode) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vnp_Params[key];
        return acc;
      }, {});

    const signData = Object.keys(sortedParams)
      .map((key) => `${key}=${sortedParams[key]}`)
      .join('&');

    // Sửa chữ ký ở đây, sử dụng SHA-512 và khóa bí mật
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    // Kiểm tra tính hợp lệ của chữ ký
    if (signed == vnp_Params.vnp_SecureHash) {

      // Nếu chữ ký hợp lệ, thực hiện chuyển trang
      const redirectUrl = `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;
      // console.log(redirectUrl);
      res.redirect(redirectUrl);
    } else {
      // Nếu chữ ký không hợp lệ, trả về lỗi
      res.status(400).json({ error: 'Chữ ký không hợp lệ' });
    }
  } catch (error) {
    console.error('Lỗi tạo URL thanh toán:', error);
    res.status(500).json({ error: 'Lỗi Nội bộ của Server' });
  }
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
      // const emailOptions = {
      //   to: 'recipient@example.com', // Địa chỉ email của người nhận
      //   subject: 'Xác nhận thanh toán',
      //   text: `Thanh toán thành công cho đơn hàng ${orderId}.`,
      // };

      // await sendEmail(emailOptions);

      // Trả về phản hồi cho người dùng
      sendResponse(res, 200, 'Payment success', order);
    } else {
      // Xử lý đơn hàng không hợp lệ
      sendResponse(res, 400, 'Invalid payment');
    }
  } catch (error) {
    console.error('Error processing VNPAY callback:', error);
    sendResponse(res, 500, 'Internal Server Error');
  }
};

