import Appointment from "../models/Appointment.js";

/* ================= GET ALL ================= */
export const getAllAppointments = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const data = await Appointment.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    /* 🔥 FILTER FUTURE ONLY */
    const filtered = data.filter((a) => {
      const appointmentDate = new Date(a.date);
      return appointmentDate >= today;
    });

    res.json(filtered);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
/* ================= UPDATE STATUS ================= */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rescheduledDate, rescheduledTime } = req.body;

    const updateData = { status };

    /* 🔥 HANDLE RESCHEDULE */
    if (status === "Rescheduled") {
      updateData.rescheduledDate = rescheduledDate;
      updateData.rescheduledTime = rescheduledTime;
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};