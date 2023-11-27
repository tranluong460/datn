import express from "express";

import { createPaymentUrl, vnpayCallback } from "../controller/payment";

const router = express.Router();

// router.get("/", loginMiddleware, getAll);
router.post("/create", createPaymentUrl);
router.post("/vnpay-callback", vnpayCallback);

export default router;
