import express from "express";

import { createPaymentUrl, vnpayCallback } from "../controller/payment";
import { isAdminMiddleware } from "../middleware";
import { loginMiddleware } from "../middleware";
const router = express.Router();

// router.get("/", loginMiddleware, getAll);
router.post("/", loginMiddleware, createPaymentUrl);
router.post("/vnpay-callback", loginMiddleware, vnpayCallback);

export default router;
