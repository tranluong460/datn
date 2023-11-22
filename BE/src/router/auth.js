import express from "express";

import {
  getAll,
  getInfoUserById,
  register,
  login,
  lockAccount,
  refreshToken,
  getUserByToken,
  googleOauth,
  logout,
  getCode,
  checkCode,
  changePassword,
} from "../controller/auth";
import { isAdminMiddleware, loginMiddleware } from "../middleware";

const router = express.Router();

router.get("/", isAdminMiddleware, getAll);
router.post("/info-user/:id", isAdminMiddleware, getInfoUserById);
router.post("/register", register);
router.post("/login", login);
router.post("/lock-account/:id", isAdminMiddleware, lockAccount);
router.get("/refresh-token", refreshToken);
router.get("/get-user", loginMiddleware, getUserByToken);
router.get("/google", googleOauth);
router.post("/logout", logout);
router.post("/send-code", getCode);
router.post("/check-code", checkCode);
router.post("/change-password", changePassword);

export default router;
