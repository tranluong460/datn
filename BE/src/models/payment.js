import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    id_booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Thành công", "Thất bại"],
      default: "Thành công",
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
