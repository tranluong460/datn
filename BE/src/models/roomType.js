import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Đang áp dụng', 'Không được áp dụng'],
      default: 'Đang áp dụng'
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("RoomType", roomTypeSchema);
