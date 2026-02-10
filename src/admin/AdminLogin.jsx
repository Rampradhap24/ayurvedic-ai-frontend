import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // SIMPLE DEMO CHECK
    if (email === "admin@ayurveda.com" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-bg">
      <div className="admin-card">

        <h2>Admin Login</h2>
        <p className="sub">Ayurvedic AI Healer – Admin Panel</p>

        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

      </div>
    </div>
  );
}

export default AdminLogin;