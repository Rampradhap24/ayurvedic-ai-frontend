import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

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
            <h2>🌿 Admin Dashboard</h2>
            <p className="sub">
              Manage your Ayurvedic AI Healer system
            </p>
          </div>

          {/* SMALL LOGOUT */}
          <button
            className="logout-btn small-logout"
            onClick={logout}
          >
            🚪 Logout
          </button>
        </div>

        {/* ===== GRID ===== */}
        <div className="admin-grid">

          {/* REPORTS */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/reports")}
          >
            <span className="admin-icon">📊</span>
            <h3>Reports</h3>
            <span>View analytics & insights</span>
          </div>

          {/* INVENTORY */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/inventory")}
          >
            <span className="admin-icon">🧴</span>
            <h3>Inventory</h3>
            <span>Manage medicines & stock</span>
          </div>

          {/* ORDERS */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/orders")}
          >
            <span className="admin-icon">📦</span>
            <h3>Orders</h3>
            <span>Track customer orders</span>
          </div>

          {/* DOCTOR PANEL */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/appointments")}
          >
            <span className="admin-icon">🩺</span>
            <h3>Doctor Panel</h3>
            <span>Approve user appointments</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;