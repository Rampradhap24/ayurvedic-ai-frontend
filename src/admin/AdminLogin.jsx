import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminlogin.css";
import bg from "../assets/ayurveda-bg.jpg";
function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      /* ✅ IMPORTANT FIX (STORE TOKEN) */
      localStorage.setItem(
        "admin",
        JSON.stringify({
          token: data.token,
          username: data.username,
        })
      );

      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">

      <div className="login-card">

        <h2 className="login-title">🌿 Admin Login</h2>
        <p className="login-subtitle">
          Ayurvedic AI Healer – Admin Panel
        </p>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;