import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    check_in: {
      type: Date,
      required: true,
    },
    check_out: {
      type: Date,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      required: false,
      enum: ["Zalo Pay", "VN Pay", "MoMo"],
      default: "VN Pay",
    },
    id_payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    id_hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    city: {
      type: Number,
      required: true,
    },
    list_room: [
      {
        _id: false,
        idRoom: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    payment_status: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [
        "Chờ thanh toán",
        "Đang xử lý",
        "Đã xác nhận",
        "Đã hủy bỏ",
        "Vắng mặt",
        "Đã nhận phòng",
        "Thành công",
      ],
      default: "Chờ thanh toán",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Booking", BookingSchema);
