import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import AmenitiesRouter from "../src/router/amenities";
import AuthRouter from "./router/auth";
import BillRouter from "./router/bill";
import BookingRouter from "./router/booking";
import HotelRouter from "./router/hotel";
import PaymentRouter from "./router/payment";
import ReviewRouter from "./router/review";
import RoomRouter from "./router/room";
import RoomTypeRouter from "./router/roomType";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.PUBLIC_URL || "http://localhost:5173",
  })
);

app.use("/amenities", AmenitiesRouter);
app.use("/auth", AuthRouter);
app.use("/bill", BillRouter);
app.use("/booking", BookingRouter);
app.use("/hotel", HotelRouter);
app.use("/payment", PaymentRouter);
app.use("/review", ReviewRouter);
app.use("/room", RoomRouter);
app.use("/room-type", RoomTypeRouter);

mongoose.connect(process.env.DB_URL);

export const viteNodeApp = app;
