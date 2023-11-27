import { sendResponse } from "../utils";
import { PaymentModel } from "../models";
import crypto from "crypto";
import moment from "moment";
import querystring from "qs";

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export const createPaymentUrl = (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = "KTNV227U";
  let secretKey = "NLRZCNSNHGCVECUHGMENJBBMZZOMNJLV";
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  let returnUrl = "http://localhost:8888/order/vnpay_return";
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.amount;

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  console.log(vnpUrl);
  return sendResponse(res, 200, 'Chuyển sang trang thanh toán', vnpUrl);
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
        paymentStatus: "Thành công", // Hoặc trạng thái tương ứng
        // Các trường khác của đơn hàng
        ...req.body,
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
      sendResponse(res, 200, "Payment success", order);
    } else {
      // Xử lý đơn hàng không hợp lệ
      sendResponse(res, 400, "Invalid payment");
    }
  } catch (error) {
    console.error("Error processing VNPAY callback:", error);
    sendResponse(res, 500, "Internal Server Error");
  }
};
