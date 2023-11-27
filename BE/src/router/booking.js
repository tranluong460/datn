import express from "express";

import { create, getAll, update } from "../controller/booking";
import { loginMiddleware, isAdminMiddleware } from "../middleware";

const router = express.Router();

router.get("/", isAdminMiddleware, getAll);
router.post("/", loginMiddleware, create);
router.patch("/:id", isAdminMiddleware, update);

export default router;
