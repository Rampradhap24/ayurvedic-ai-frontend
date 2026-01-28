import "../styles/common.css";
import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();

  // Language text
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

  return (
    <div className="bg-ayurveda">
      <div className="auth-animate">
        <div className="glass-card">

          {/* LANGUAGE SELECT (NO STYLE CHANGE) */}
          <div style={{ textAlign: "right", marginBottom: "8px" }}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          <h2 className="auth-title">{text[lang].title}</h2>
          <p className="auth-sub">{text[lang].sub}</p>

          <div className="field">
            <input required />
            <label>{text[lang].email}</label>
          </div>

          <div className="field">
            <input
              type={showPassword ? "text" : "password"}
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

          <button onClick={() => navigate("/dashboard")}>
            {text[lang].login}
          </button>

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