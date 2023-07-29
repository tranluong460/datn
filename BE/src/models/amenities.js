import mongoose from "mongoose";
const amenitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surcharge: {
        type: Number,
        default: 0,
    }
}, { versionKey: false, timestamps: true })
export default mongoose.model("Amenities", amenitiesSchema)