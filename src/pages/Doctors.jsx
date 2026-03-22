import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import {
  getMyAppointments,
  bookAppointment,
} from "../services/appointment.api";

function Doctors() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const doctor = {
    name: "Dr. Suresh Kumar",
    specialization: "Ayurveda Specialist",
  };

  const slots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("LOAD ERROR:", err);
        setAppointments([]);
      }
    };

    load();
  }, []);

  /* ================= BOOK ================= */
  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) {
      alert("Select date & time");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const chosen = new Date(selectedDate);

    /* ❌ BLOCK PAST DATE */
    if (chosen < today) {
      alert("Cannot book past date");
      return;
    }

    try {
      await bookAppointment({
        doctorName: doctor.name,
        date: selectedDate,
        time: selectedSlot,
      });

      setSelectedDate("");
      setSelectedSlot("");

      const updated = await getMyAppointments();
      setAppointments(Array.isArray(updated) ? updated : []);

    } catch (err) {
      console.error("BOOK ERROR:", err);
    }
  };

  /* ================= FILTER ================= */
  const pending = appointments.filter((a) => a.status === "Pending");

  const accepted = appointments.filter((a) => a.status === "Accepted");

  const rescheduled = appointments.filter(
    (a) => a.status === "Rescheduled"
  );

  return (
    <>
      <Navbar />

      <div className="doctor-page">
        <div className="doctor-container">

          {/* LEFT */}
          <div className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
          </div>

          {/* CENTER */}
          <div className="booking-card">
            <h3>Book Appointment</h3>

            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]} // ✅ BLOCK PAST
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <div className="slot-grid">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={
                    selectedSlot === slot ? "active" : ""
                  }
                >
                  {slot}
                </button>
              ))}
            </div>

            <button onClick={handleBook}>
              Book
            </button>
          </div>

          {/* RIGHT */}
          <div className="history-card">
            <h3>Appointments</h3>

            {/* TABS */}
            <div className="tab-bar">
              <button onClick={() => setActiveTab("pending")}>
                Pending ({pending.length})
              </button>

              <button onClick={() => setActiveTab("accepted")}>
                Booked ({accepted.length})
              </button>

              <button onClick={() => setActiveTab("rescheduled")}>
                Rescheduled ({rescheduled.length})
              </button>
            </div>

            {/* LIST */}
            {(activeTab === "pending"
              ? pending
              : activeTab === "accepted"
              ? accepted
              : rescheduled
            ).map((a) => (
              <div key={a._id} className="appointment-item">

                <p><strong>{a.doctorName}</strong></p>

                <p>
                  {new Date(a.date).toLocaleDateString()} | {a.time}
                </p>

                {/* STATUS */}
                <p
                  style={{
                    color:
                      a.status === "Accepted"
                        ? "green"
                        : a.status === "Rescheduled"
                        ? "#17a2b8"
                        : "orange",
                    fontWeight: "600",
                  }}
                >
                  {a.status === "Accepted"
                    ? "Booked"
                    : a.status}
                </p>

                {/* 🔁 RESCHEDULE INFO */}
                {a.status === "Rescheduled" && (
                  <p style={{ color: "#17a2b8" }}>
                    New Slot: {a.rescheduledDate} |{" "}
                    {a.rescheduledTime}
                  </p>
                )}

              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
}

export default Doctors;