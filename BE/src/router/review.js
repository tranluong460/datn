import express from "express";

import { getAll, getOne, create, update, remove } from "../controller/review";
import { isAdminMiddleware, loginMiddleware } from "../middleware";

const router = express.Router();

router.get("/", isAdminMiddleware, getAll);
router.get("/:id", isAdminMiddleware, getOne);
router.post("/", loginMiddleware, create);
router.delete("/:id", loginMiddleware, remove);

export default router;
