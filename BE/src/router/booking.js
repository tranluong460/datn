import express from "express";

import {
  create,
  getAll,
  update,
  getBookingByUser,
} from "../controller/booking";
import { loginMiddleware, isAdminMiddleware } from "../middleware";

const router = express.Router();

router.get("/", isAdminMiddleware, getAll);
router.get("/booking-user", loginMiddleware, getBookingByUser);
router.post("/", loginMiddleware, create);
router.patch("/:id", loginMiddleware, update);

export default router;
