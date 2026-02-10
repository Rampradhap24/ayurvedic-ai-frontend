import Appointment from "../models/Appointment.js";

/* CREATE APPOINTMENT */
export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: req.body.doctor,
      specialization: req.body.specialization,
      date: req.body.date,
      time: req.body.time,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET MY APPOINTMENTS */
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};