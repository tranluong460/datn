import express from "express";
import expressFormidable from "express-formidable";

import { getAll, getOne, create, update, search } from "../controller/room";
import { isAdminMiddleware } from "../middleware";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", isAdminMiddleware, expressFormidable(), create);
router.post("/search", search);
router.patch("/:id", isAdminMiddleware, expressFormidable(), update);

export default router;
