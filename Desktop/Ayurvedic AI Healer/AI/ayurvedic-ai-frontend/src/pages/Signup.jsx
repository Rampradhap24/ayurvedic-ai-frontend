import "../styles/common.css";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="bg-ayurveda">
      <div className="auth-animate">
        <div className="glass-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-sub">Start your healing journey</p>

          <div className="field">
            <input required />
            <label>Name</label>
          </div>

          <div className="field">
            <input required />
            <label>Email</label>
          </div>

          <div className="field">
            <input type="password" required />
            <label>Password</label>
          </div>

          <button onClick={() => navigate("/login")}>
            Sign Up
          </button>

          <p className="switch">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;