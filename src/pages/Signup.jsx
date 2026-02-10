import "../styles/common.css";
import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="bg-ayurveda">
      <div className="auth-animate">
        <div className="glass-card">

          <h2 className="auth-title">Create Account</h2>
          <p className="auth-sub">Start your healing journey</p>

          {/* NAME */}
          <div className="field">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>

          {/* EMAIL */}
          <div className="field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          {/* PASSWORD */}
          <div className="field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          {/* ERROR / SUCCESS */}
          {error && (
            <p style={{ color: "#ffbdbd", fontSize: "13px" }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "#b9ffb9", fontSize: "13px" }}>
              {success}
            </p>
          )}

          {/* BUTTON */}
          <button onClick={handleSignup}>
            Sign Up
          </button>

          <p className="switch">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;