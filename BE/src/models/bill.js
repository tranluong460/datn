import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    id_payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Bill", billSchema);
