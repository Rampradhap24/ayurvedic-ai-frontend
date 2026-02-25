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
        <h2>Admin Dashboard</h2>

        <div className="admin-grid">
          <div
            className="admin-box"
            onClick={() => navigate("/admin/reports")}
          >
            📊 View Reports
          </div>

          <div
            className="admin-box"
            onClick={() => navigate("/admin/inventory")}
          >
            🧴 Manage Inventory
          </div>

          <div
            className="admin-box"
            onClick={() => navigate("/admin/orders")}
          >
            📦 View Orders
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;