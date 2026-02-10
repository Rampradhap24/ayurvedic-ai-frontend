import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: String,
    specialization: String,
    date: String,
    time: String,
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);