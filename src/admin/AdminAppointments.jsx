import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔥 NEW STATES (RESCHEDULE) */
  const [selectedId, setSelectedId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5001/api/admin/appointments"
      );

      const data = await res.json();
      setAppointments(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= UPDATE ================= */
  const updateStatus = async (id, status, date, time) => {
    try {
      await fetch(
        `http://localhost:5001/api/admin/appointments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            rescheduledDate: date,
            rescheduledTime: time,
          }),
        }
      );

      /* RESET */
      setSelectedId(null);
      setNewDate("");
      setNewTime("");

      fetchData();

    } catch (err) {
      console.error(err);
    }
  };

  /* ================= STATUS COLOR ================= */
  const getStatusStyle = (status) => {
    if (status === "Accepted") return { bg: "#7ed957", text: "#123" };
    if (status === "Rejected") return { bg: "#ff4d4d", text: "#fff" };
    if (status === "Rescheduled") return { bg: "#17a2b8", text: "#fff" };
    return { bg: "#ffc107", text: "#000" };
  };

  return (
    <div className="admin-bg">
      <div className="admin-panel">

        {/* HEADER */}
        <div className="admin-header">
          <div>
            <h2>🩺 Appointment Requests</h2>
            <p className="sub">Approve, reject or reschedule</p>
          </div>

          <button
            className="small-btn back-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ⬅ Back
          </button>
        </div>

        {/* LOADING */}
        {loading && <p>Loading...</p>}

        {/* EMPTY */}
        {!loading && appointments.length === 0 && (
          <p>No appointments found</p>
        )}

        {/* LIST */}
        <div className="admin-grid">
          {appointments.map((a) => {
            const statusStyle = getStatusStyle(a.status);

            return (
              <div className="admin-card" key={a._id}>

                {/* USER */}
                <h3>{a.user?.name || "User"}</h3>
                <span>{a.user?.email}</span>

                <hr style={{ margin: "10px 0", opacity: 0.2 }} />

                {/* DETAILS */}
                <p><strong>Doctor:</strong> {a.doctorName}</p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(a.date).toLocaleDateString()}
                </p>

                {a.time && (
                  <p><strong>Time:</strong> {a.time}</p>
                )}

                {/* 🔁 RESCHEDULE INFO */}
                {a.status === "Rescheduled" && (
                  <p style={{ color: "#17a2b8", fontWeight: "600" }}>
                    New: {a.rescheduledDate} | {a.rescheduledTime}
                  </p>
                )}

                {/* STATUS */}
                <div style={{ marginTop: "10px" }}>
                  <span
                    style={{
                      background: statusStyle.bg,
                      color: statusStyle.text,
                      padding: "5px 12px",
                      borderRadius: "10px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {a.status === "Accepted"
                      ? "Booked"
                      : a.status}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                {a.status === "Pending" && (
                  <div className="btn-group">

                    <button
                      className="admin-btn"
                      onClick={() =>
                        updateStatus(a._id, "Accepted")
                      }
                    >
                      ✅ Confirm
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        updateStatus(a._id, "Rejected")
                      }
                    >
                      ❌ Reject
                    </button>

                    <button
                      className="admin-btn"
                      style={{ background: "#17a2b8", color: "#fff" }}
                      onClick={() => setSelectedId(a._id)}
                    >
                      🔁 Reschedule
                    </button>

                  </div>
                )}

                {/* 🔥 RESCHEDULE FORM */}
                {selectedId === a._id && (
                  <div style={{ marginTop: "12px" }}>

                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="Time (e.g. 11:30 AM)"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />

                    <button
                      className="admin-btn"
                      onClick={() =>
                        updateStatus(
                          a._id,
                          "Rescheduled",
                          newDate,
                          newTime
                        )
                      }
                    >
                      Save New Slot
                    </button>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default AdminAppointments;