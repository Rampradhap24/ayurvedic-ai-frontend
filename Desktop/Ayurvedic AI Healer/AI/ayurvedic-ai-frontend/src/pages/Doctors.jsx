import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";

function Doctors() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const [appointment, setAppointment] = useState({
    doctor: "Dr. Suresh Kumar",
    specialization: "Ayurveda Specialist",
    date: "2026-02-05",
    time: "11:00 AM",
  });

  const [isEditing, setIsEditing] = useState(false);

  const slots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date and time slot");
      return;
    }

    setAppointment({
      ...appointment,
      date: selectedDate,
      time: selectedSlot,
    });

    setIsEditing(false);
  };

  const handleEdit = () => {
    setSelectedDate(appointment.date);
    setSelectedSlot(appointment.time);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setAppointment(null);
    setSelectedDate("");
    setSelectedSlot("");
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />

      <div className="doctors-bg page-animate">
        <div className="doctors-wrapper">
          <div className="doctors-glass">

            <h2 className="doctors-title">Doctor Consultation</h2>
            <p className="doctors-sub">
              View and manage your scheduled appointment
            </p>

            <div className="doctors-grid">

              {/* DOCTOR INFO */}
              <div className="doctor-card">
                <h4>{appointment?.doctor}</h4>
                <p>{appointment?.specialization}</p>
                <p>Experience: 12 years</p>

                {appointment && (
                  <div className="current-appointment">
                    <p><strong>📅 Date:</strong> {appointment.date}</p>
                    <p><strong>⏰ Time:</strong> {appointment.time}</p>
                  </div>
                )}
              </div>

              {/* BOOK / EDIT */}
              <div className="schedule-card">

                <label>Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  disabled={!isEditing && appointment}
                />

                <label>Select Time Slot</label>
                <div className="slots">
                  {slots.map((slot, index) => {
                    const isBooked =
                      appointment &&
                      appointment.time === slot &&
                      !isEditing;

                    return (
                      <button
                        key={index}
                        disabled={isBooked}
                        className={
                          isBooked
                            ? "slot booked"
                            : selectedSlot === slot
                            ? "slot active"
                            : "slot"
                        }
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {isBooked ? `${slot} • Booked` : slot}
                      </button>
                    );
                  })}
                </div>

                {!appointment || isEditing ? (
                  <button className="book-btn" onClick={handleBooking}>
                    {appointment ? "Save Changes" : "Book Appointment"}
                  </button>
                ) : (
                  <div className="appointment-actions">
                    <button className="edit-btn" onClick={handleEdit}>
                      Edit / Reschedule
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Doctors;