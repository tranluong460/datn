import express from "express";

import { createPaymentUrl } from "../controller/payment";
import { isAdminMiddleware } from "../middleware";
import { loginMiddleware } from "../middleware";
const router = express.Router();

// router.get("/", loginMiddleware, getAll);
router.post("/", loginMiddleware, createPaymentUrl);

export default router;
