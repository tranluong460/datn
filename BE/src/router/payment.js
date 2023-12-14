import express from "express";

import {
  vnPayPayment,
  vnPayPaymentReturn,
  createOrderZaloPay,
  checkStatusZaloPay,
} from "../controller/payment";

const router = express.Router();

router.post("/vnPay", vnPayPayment);
router.get("/vnPay-return", vnPayPaymentReturn);
router.post("/create-order-zaloPay", createOrderZaloPay);
router.post("/check-status-zaloPay/:code", checkStatusZaloPay);

export default router;
