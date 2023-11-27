import qs from "qs";
import crypto from "crypto";
import moment from "moment";
import dotenv from "dotenv";

import { BookingModel, PaymentModel } from "../models";
import { sendResponse, sortObject } from "../utils";

dotenv.config();

export const vnPayPayment = (req, res) => {
  try {
    process.env.TZ = "Asia/Ho_Chi_Minh";

    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");

    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const orderId = req.body.orderId || moment(date).format("DDHHmmss");
    const amount = req.body.amount;
    const locale = req.body.language || "vn";

    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = process.env.VNP_TMNCODE;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = "VND";
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderId;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = process.env.VNP_RETURNURL;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
    const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    vnp_Params["vnp_SecureHash"] = signed;

    const url = `${process.env.VNP_URL}?${qs.stringify(vnp_Params, {
      encode: false,
    })}`;

    res.redirect(url);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra");
  }
};

export const vnPayPaymentReturn = async (req, res) => {
  let vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  try {
    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
    const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    if (secureHash !== signed) {
      res.redirect(`${process.env.PUBLIC_URL}/error-payment-signed`);
    }

    const date = vnp_Params["vnp_PayDate:"];

    const id = vnp_Params["vnp_OrderInfo"];
    const amount = vnp_Params["vnp_Amount"];
    const formatDate = moment(date).format("YYYY/MM/DD");

    const data = {
      id_booking: id,
      amount,
      payment_date: formatDate,
    };

    const payment = await PaymentModel.create(data);
    await BookingModel.findByIdAndUpdate(
      { _id: id },
      { status: "Đang xử lý", id_payment: payment._id },
      { new: true }
    );

    res.redirect(`${process.env.PUBLIC_URL}/success-payment`);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra");
  }
};
