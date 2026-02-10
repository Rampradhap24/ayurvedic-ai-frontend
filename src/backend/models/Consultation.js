import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,  required: true,},
    symptoms: String,
    aiResponse: String,
  },
  { timestamps: true }
);

export default mongoose.model("Consultation", consultationSchema);