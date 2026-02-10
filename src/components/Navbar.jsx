import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const isActive = (path) =>
    location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="nav-logo">🌿</span>
        <span className="nav-title">Ayurvedic AI Healer</span>
      </div>

      {/* CENTER */}
      {token && (
        <div className="nav-center">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/consultation" className={isActive("/consultation")}>
            AI Consultation
          </Link>
          <Link to="/inventory" className={isActive("/inventory")}>
            Store
          </Link>
          <Link to="/doctors" className={isActive("/doctors")}>
            Doctors
          </Link>
        </div>
      )}

      {/* RIGHT – PROFILE */}
      {user && (
        <div
          className="profile-only"
          onClick={() => navigate("/profile")}
        >
          <div className="profile-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="profile-name">{user.name}</span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;