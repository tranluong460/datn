import express from "express";

import {
  getAll,
  getOne,
  getBookingByUser,
  create,
  update,
} from "../controller/booking";
import { loginMiddleware, isAdminMiddleware } from "../middleware";

const router = express.Router();

router.get("/", isAdminMiddleware, getAll);
router.get("/get-one/:id", isAdminMiddleware, getOne);
router.get("/booking-user", loginMiddleware, getBookingByUser);
router.post("/", loginMiddleware, create);
router.patch("/:id", loginMiddleware, update);

export default router;
