import mongoose from "mongoose";

const amenitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    features: [
      {
        _id: false,
        name: {
          type: String,
          required: false,
        },
        surcharge: {
          type: Boolean,
          default: false,
          required: false,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Amenities", amenitiesSchema);
