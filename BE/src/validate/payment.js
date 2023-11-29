import joi from "joi";

import { validationErrors } from "../utils";

const paymentValidate = joi.object({
  amount: joi
    .number()
    .min(1)
    .required()
    .messages(validationErrors("Tổng tiền")),
  bookingId: joi.string().required().messages(validationErrors("Id đơn hàng")),
});

export default paymentValidate;
