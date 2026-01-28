import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active-link" : "";

  // LEFT CLICK → PROFILE
  const goToProfile = () => {
    navigate("/profile");
  };

  // RIGHT CLICK → LOGOUT
  const handleRightClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="nav-logo">🌿</span>
        <span className="nav-title">Ayurvedic AI Healer</span>
      </div>

      {/* CENTER */}
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

      {/* RIGHT */}
      <div
        className="nav-right profile-only"
        onClick={goToProfile}
        onContextMenu={handleRightClick}
        title="Right click to Logout"
      >
        <div className="profile-circle">R</div>
        <span className="profile-name">Ram</span>
      </div>
    </nav>
  );
}

export default Navbar;