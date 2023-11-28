import joi from "joi";

import { validationErrors } from "../utils";

const bookingValidate = joi.object({
  check_in: joi.date().required().messages(validationErrors("Ngày nhận phòng")),
  check_out: joi.date().required().messages(validationErrors("Ngày trả phòng")),
  total_price: joi.number().required().messages(validationErrors("Tổng giá")),
  payment_method: joi
    .string()
    .optional()
    .valid("VN Pay", "Zalo Pay", "MoMo")
    .default("VN Pay")
    .messages(validationErrors("Phương thức thanh toán")),
  list_room: joi
    .array()
    .items(
      joi
        .string()
        .hex()
        .length(24)
        .required()
        .messages(validationErrors("Item", { limit: 24 }))
    )
    .required()
    .messages(validationErrors("Danh sách phòng")),
  status: joi
    .string()
    .valid(
      "Chờ thanh toán",
      "Đang xử lý",
      "Đã xác nhận",
      "Đã hủy bỏ",
      "Vắng mặt",
      "Đã nhận phòng",
      "Thành Công"
    )
    .default("Chờ thanh toán")
    .messages(validationErrors("Trạng thái")),
});

export default bookingValidate;
