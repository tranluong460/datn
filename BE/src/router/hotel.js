import express from "express";
import expressFormidable from "express-formidable";

import { getAll, getOne, create, update } from "../controller/hotel";
import { isAdminMiddleware } from "../middleware";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", isAdminMiddleware, expressFormidable(), create);
router.patch("/:id", isAdminMiddleware, expressFormidable(), update);

export default router;
