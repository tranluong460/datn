import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import {
  AmenitiesRouter,
  AuthRouter,
  BannerRouter,
  BillRouter,
  BookingRouter,
  HotelRouter,
  PaymentRouter,
  ReviewRouter,
  RoomRouter,
  RoomTypeRouter,
  VoucherRouter,
} from "./router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/amenities", AmenitiesRouter);
app.use("/auth", AuthRouter);
app.use("/bill", BillRouter);
app.use("/booking", BookingRouter);
app.use("/hotel", HotelRouter);
app.use("/payment", PaymentRouter);
app.use("/review", ReviewRouter);
app.use("/room", RoomRouter);
app.use("/room-type", RoomTypeRouter);
app.use("/banner", BannerRouter);
app.use("/voucher", VoucherRouter);

mongoose.connect(process.env.DB_URL);

process.on("uncaughtException", (err) => {
  console.log(err);
});

export const viteNodeApp = app;
