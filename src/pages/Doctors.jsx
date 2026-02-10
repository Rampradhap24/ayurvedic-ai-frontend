import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import {
  getMyAppointments,
  bookAppointment,
} from "../services/appointment.api";

function Doctors() {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const doctor = {
    name: "Dr. Suresh Kumar",
    specialization: "Ayurveda Specialist",
    experience: "12+ Years",
  };

  const slots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  /* ================= LOAD HISTORY ================= */
  useEffect(() => {
    if (!token) return;

    const load = async () => {
      const data = await getMyAppointments(token);
      setAppointments(Array.isArray(data) ? data : []);
    };

    load();
  }, [token]);

  /* ================= BOOK APPOINTMENT ================= */
  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date & time");
      return;
    }

    await bookAppointment(
      {
        doctor: doctor.name,
        specialization: doctor.specialization,
        date: selectedDate,
        time: selectedSlot,
      },
      token
    );

    setSelectedDate("");
    setSelectedSlot("");

    const updated = await getMyAppointments(token);
    setAppointments(updated);
  };

  return (
    <>
      <Navbar />

      <div className="doctor-page page-animate">
        <div className="doctor-container">

          {/* ================= LEFT – DOCTOR INFO ================= */}
          <div className="doctor-card">
            <div className="doctor-avatar">👨‍⚕️</div>
            <h3>{doctor.name}</h3>
            <p className="special">{doctor.specialization}</p>
            <p className="exp">Experience: {doctor.experience}</p>
          </div>

          {/* ================= CENTER – BOOKING ================= */}
          <div className="booking-card">
            <h3>Book Appointment</h3>

            <label>Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <label>Select Time</label>
            <div className="slot-grid">
              {slots.map((slot) => (
                <button
                  key={slot}
                  className={
                    selectedSlot === slot ? "slot active" : "slot"
                  }
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button className="book-btn" onClick={handleBook}>
              Confirm Appointment
            </button>
          </div>

          {/* ================= RIGHT – HISTORY (SCROLLABLE) ================= */}
          <div className="history-card">
            <h3>Consultation History</h3>

            <div className="appointment-history">
              {appointments.length === 0 ? (
                <p className="appointment-empty">
                  No consultations yet 🌿
                </p>
              ) : (
                appointments.map((a) => (
                  <div className="appointment-item" key={a._id}>
                    <div>
                      <h4>{a.doctor}</h4>
                      <p>{a.specialization}</p>
                    </div>
                    <div className="time">
                      <p>{a.date}</p>
                      <p>{a.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Doctors;