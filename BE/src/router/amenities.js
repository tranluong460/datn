import express from "express";

import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../controller/amenities";
import { isAdminMiddleware } from "../middleware";

const AmenitiesRouter = express.Router();

AmenitiesRouter.get("/", getAll);
AmenitiesRouter.get("/:id", getOne);
AmenitiesRouter.post("/", isAdminMiddleware, create);
AmenitiesRouter.patch("/:id", isAdminMiddleware, update);
AmenitiesRouter.delete("/:id", isAdminMiddleware, remove);

export default AmenitiesRouter;
