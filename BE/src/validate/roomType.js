import joi from "joi";

import { validationErrors } from "../utils";

const roomTypeValidate = joi.object({
  name: joi.string().required().messages(validationErrors("Tên loại phòng")),
  status: joi.string().required().messages(validationErrors("Trạng thái phòng")),

});

export default roomTypeValidate;
