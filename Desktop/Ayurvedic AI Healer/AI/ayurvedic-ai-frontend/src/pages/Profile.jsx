import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  /* ================= PROFILE DETAILS ================= */
  const [details, setDetails] = useState(() => {
    const saved = localStorage.getItem("profileDetails");
    return saved
      ? JSON.parse(saved)
      : {
          age: "",
          height: "",
          weight: "",
          workType: "",
        };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempDetails, setTempDetails] = useState(details);

  /* ================= APPOINTMENT ================= */
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const storedAppt = localStorage.getItem("appointment");
    if (storedAppt) {
      setAppointment(JSON.parse(storedAppt));
    }
  }, []);

  /* SAVE PROFILE DETAILS */
  useEffect(() => {
    localStorage.setItem("profileDetails", JSON.stringify(details));
  }, [details]);

  /* MOCK HISTORY */
  const history = [
    {
      id: 1,
      date: "20 Jan 2026",
      activity: "AI Consultation",
      note: "Digestive issue – Triphala recommended",
    },
    {
      id: 2,
      date: "18 Jan 2026",
      activity: "Medicine Purchased",
      note: "Hridya Amrit",
    },
  ];

  /* MOCK ORDERS */
  const orders = [
    {
      id: "ORD1023",
      date: "24 Jan 2026",
      items: 3,
      amount: 1299,
      status: "Delivered",
    },
  ];

  const handleSave = () => {
    setDetails(tempDetails);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDetails(details);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />

      <div className="profile-bg page-animate">
        <div className="profile-wrapper">

          {/* ================= LEFT PROFILE ================= */}
          <div className="profile-card">
            <div className="profile-avatar">R</div>
            <h2 className="profile-name">Ram Pradhap</h2>
            <p className="profile-email">ram@example.com</p>

            {/* DETAILS */}
            {["age", "height", "weight", "workType"].map((field) => (
              <div className="detail-row" key={field}>
                <span className="label">
                  {field === "workType"
                    ? "Work Type"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </span>

                {isEditing ? (
                  <input
                    value={tempDetails[field]}
                    onChange={(e) =>
                      setTempDetails({
                        ...tempDetails,
                        [field]: e.target.value,
                      })
                    }
                    placeholder={`Enter ${field}`}
                  />
                ) : (
                  <span className="value">
                    {details[field] || "—"}
                  </span>
                )}
              </div>
            ))}

            {/* ACTION BUTTONS */}
            {!isEditing ? (
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}

            <button
              className="logout-btn"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>

          {/* ================= RIGHT SECTION ================= */}
          <div className="profile-right">

            {/* DOCTOR APPOINTMENT */}
            <div className="glass-section">
              <h3>Doctor Appointment</h3>

              {appointment ? (
                <div className="appointment-card">
                  <p><strong>Doctor:</strong> {appointment.doctor}</p>
                  <p><strong>Specialization:</strong> {appointment.specialization}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                </div>
              ) : (
                <p className="empty-text">
                  No appointment scheduled yet
                </p>
              )}
            </div>

            {/* HEALTH & ACTIVITY */}
            <div className="glass-section">
              <h3>Health & Activity History</h3>

              {history.map((item) => (
                <div className="history-item" key={item.id}>
                  <div>
                    <h4>{item.activity}</h4>
                    <p>{item.note}</p>
                  </div>
                  <span className="history-date">{item.date}</span>
                </div>
              ))}
            </div>

            {/* ORDERS */}
            <div className="glass-section">
              <h3>My Orders</h3>

              {orders.map((order) => (
                <div className="order-item" key={order.id}>
                  <div>
                    <h4>{order.id}</h4>
                    <p>
                      {order.date} • {order.items} items
                    </p>
                  </div>
                  <div className="order-right">
                    <span className="order-amount">₹{order.amount}</span>
                    <span
                      className={`order-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;