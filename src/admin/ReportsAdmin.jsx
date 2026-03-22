import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/admin.css";

function ReportsAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* ================= DOWNLOAD FUNCTION ================= */
  const downloadReport = async (type) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5001/admin/reports/download/${type}`
      );

      console.log("STATUS:", res.status);

      if (!res.ok) {
        const text = await res.text();
        console.log("ERROR:", text);
        alert("❌ Download failed");
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${type}-report.csv`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Download error:", err);
      alert("❌ Download error");
    } finally {
      setLoading(false);
    }
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

          <div style={{ display: "flex", gap: "10px" }}>
            
            {/* ✅ FIXED BACK BUTTON */}
            <button
              className="admin-btn"
              style={{ width: "auto", padding: "6px 12px" }}
              onClick={() => navigate("/admin/dashboard")}
            >
              ⬅ Back
            </button>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {/* ===== CARDS ===== */}
        <div className="admin-grid">

          <div className="admin-card">
            <h3>👤 Users Report</h3>
            <span>All registered users data</span>

            <button
              className="admin-btn"
              disabled={loading}
              onClick={() => downloadReport("users")}
            >
              {loading ? "Downloading..." : "Download Users CSV"}
            </button>
          </div>

          <div className="admin-card">
            <h3>📦 Orders Report</h3>
            <span>All order transactions</span>

            <button
              className="admin-btn"
              disabled={loading}
              onClick={() => downloadReport("orders")}
            >
              {loading ? "Downloading..." : "Download Orders CSV"}
            </button>
          </div>

          <div className="admin-card">
            <h3>🩺 Appointments Report</h3>
            <span>Doctor appointments history</span>

            <button
              className="admin-btn"
              disabled={loading}
              onClick={() => downloadReport("appointments")}
            >
              {loading ? "Downloading..." : "Download Appointments CSV"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ReportsAdmin;