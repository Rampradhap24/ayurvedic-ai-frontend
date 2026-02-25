import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/admin.css";

function ReportsAdmin() {
  const navigate = useNavigate();

  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  /* ================= LOAD SUMMARY ================= */
  useEffect(() => {
    const loadSummary = async () => {
      try {
        const headers = { role: "admin" };

        const usersRes = await fetch(
          "http://localhost:5001/admin/reports/download/users",
          { headers }
        );

        const ordersRes = await fetch(
          "http://localhost:5001/admin/reports/download/orders",
          { headers }
        );

        const appointmentsRes = await fetch(
          "http://localhost:5001/admin/reports/download/appointments",
          { headers }
        );

        // Just checking if routes respond
        if (usersRes.ok) setUsersCount(1);
        if (ordersRes.ok) setOrdersCount(1);
        if (appointmentsRes.ok) setAppointmentsCount(1);

      } catch (err) {
        console.error("Summary load error", err);
      }
    };

    loadSummary();
  }, []);

  /* ================= DOWNLOAD FUNCTION ================= */
  const downloadReport = (type) => {
    window.open(
      `http://localhost:5001/admin/reports/download/${type}`,
      "_blank"
    );
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-bg">
      <div className="admin-panel">

        {/* ===== HEADER ===== */}
        <div className="admin-header">
          <div>
            <h2>📊 Admin Reports</h2>
            <p className="sub">
              Download Users, Orders & Appointment Reports
            </p>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="admin-grid">

          <div className="admin-card">
            👤 Users Report
            <span>All registered users data</span>
            <br />
            <button
              className="admin-btn"
              onClick={() => downloadReport("users")}
            >
              Download Users CSV
            </button>
          </div>

          <div className="admin-card">
            📦 Orders Report
            <span>All order transactions</span>
            <br />
            <button
              className="admin-btn"
              onClick={() => downloadReport("orders")}
            >
              Download Orders CSV
            </button>
          </div>

          <div className="admin-card">
            🩺 Appointments Report
            <span>Doctor appointments history</span>
            <br />
            <button
              className="admin-btn"
              onClick={() => downloadReport("appointments")}
            >
              Download Appointments CSV
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ReportsAdmin;