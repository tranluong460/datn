import express from "express";

import { vnPayPayment, vnPayPaymentReturn } from "../controller/payment";

const router = express.Router();

router.post("/vnPay", vnPayPayment);
router.get("/vnPay-return", vnPayPaymentReturn);

export default router;
