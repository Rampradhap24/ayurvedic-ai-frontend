import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-bg">
      <div className="admin-panel">

        <h2>Admin Control Panel</h2>
        <p className="sub">Ayurvedic AI Healer – System Management</p>

        <div className="admin-grid">

          <div className="admin-card" onClick={() => navigate("/admin/users")}>
            👤 Users Management
            <span>Profiles • Dashboard Data</span>
          </div>

          <div className="admin-card" onClick={() => navigate("/admin/inventory")}>
            🧴 Inventory Control
            <span>Add • Edit • Pricing</span>
          </div>

          <div className="admin-card" onClick={() => navigate("/admin/consultations")}>
            🤖 AI Consultations
            <span>Symptoms • AI Responses</span>
          </div>

          <div className="admin-card" onClick={() => navigate("/admin/orders")}>
            📦 Orders & Payments
            <span>All Purchases</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;