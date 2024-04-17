import joi from "joi";

import { validationErrors } from "../utils";

const bookingValidate = joi.object({
  check_in: joi.date().required().messages(validationErrors("Ngày nhận phòng")),
  check_out: joi.date().required().messages(validationErrors("Ngày trả phòng")),
  id_voucher: joi.string(),
  total_price: joi.number().required().messages(validationErrors("Tổng giá")),
  is_deposit_amount: joi
    .boolean()
    .required()
    .messages(validationErrors("Thanh toán trước")),
  city: joi.number().required().messages(validationErrors("Vị trí")),
  payment_method: joi
    .string()
    .optional()
    .valid("VN Pay", "Zalo Pay", "MoMo")
    .default("VN Pay")
    .messages(validationErrors("Phương thức thanh toán")),
  list_room: joi
    .array()
    .min(1)
    .required()
    .items(
      joi.object({
        idRoom: joi.string().required().messages(validationErrors("ID phòng")),
        quantity: joi
          .number()
          .required()
          .messages(validationErrors("Số lượng")),
      })
    )
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
