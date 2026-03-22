import "../styles/common.css";
import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= LANGUAGE TEXT ================= */
  const text = {
    en: {
      title: "Ayurvedic Healer",
      sub: "Login to continue",
      email: "Email",
      password: "Password",
      login: "Login",
      newUser: "New user?",
      signup: "Sign Up",
    },
    ta: {
      title: "ஆயுர்வேத ஹீலர்",
      sub: "தொடர உள்நுழையவும்",
      email: "மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      login: "உள்நுழைய",
      newUser: "புதிய பயனர்?",
      signup: "பதிவு செய்யவும்",
    },
    hi: {
      title: "आयुर्वेदिक हीलर",
      sub: "जारी रखने के लिए लॉगिन करें",
      email: "ईमेल",
      password: "पासवर्ड",
      login: "लॉगिन करें",
      newUser: "नए उपयोगकर्ता?",
      signup: "साइन अप करें",
    },
  };

  /* ================= LOGIN HANDLER ================= */
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      /* ✅ SAVE AUTH DATA */
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      /* ✅ REDIRECT */
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="bg-ayurveda">
      <div className="auth-animate">
        <div className="glass-card">

          {/* LANGUAGE SELECT */}
          <div style={{ textAlign: "right", marginBottom: "8px" }}>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          <h2 className="auth-title">{text[lang].title}</h2>
          <p className="auth-sub">{text[lang].sub}</p>

          {error && <p className="error-text">{error}</p>}

          {/* EMAIL */}
          <div className="field">
  <input
    type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    autoComplete="off"
  />
  <label>Email</label>
</div>

          {/* PASSWORD */}
          <div className="field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>{text[lang].password}</label>

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : text[lang].login}
          </button>

          {/* SIGNUP LINK */}
          <p className="switch">
            {text[lang].newUser}{" "}
            <span onClick={() => navigate("/signup")}>
              {text[lang].signup}
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;