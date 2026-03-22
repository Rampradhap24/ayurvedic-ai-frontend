import Appointment from "../models/Appointment.js";

/* ================= CREATE ================= */
export const createAppointment = async (req, res) => {
  try {
    const userId = req.headers.user;
    const { doctorName, date, time } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const appt = await Appointment.create({
      user: userId,
      doctorName,
      date,
      time,
      status: "Pending",
    });

    res.json(appt);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET USER ================= */
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.headers.user;

    if (!userId) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const data = await Appointment.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};