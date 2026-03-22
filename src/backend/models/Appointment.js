import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctorName: String,
    date: String,
    time: String,
    rescheduledDate: String,
    rescheduledTime: String,
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Rescheduled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;   // ✅ FIX