import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/success.css";

function Success() {
  const navigate = useNavigate();

  /* 🔁 AUTO REDIRECT SAFETY (OPTIONAL) */
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 8000); // auto go to profile after 8 sec

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="success-bg page-animate">
        <div className="success-wrapper">

          <div className="success-card">

            {/* BACK TO PROFILE */}
            <button
              className="back-btn"
              onClick={() => navigate("/profile")}
              title="Go to Profile"
            >
              ←
            </button>

            <div className="success-icon">✅</div>

            <h2>Order Placed Successfully</h2>
            <p className="success-sub">
              Thank you for choosing Ayurveda 🌿
            </p>

            <div className="success-info">
              <div className="row">
                <span>Payment Status</span>
                <span className="status success">Paid</span>
              </div>
              <div className="row">
                <span>Delivery</span>
                <span>3–5 Working Days</span>
              </div>
            </div>

            <div className="success-actions">
              <button
                className="primary-btn"
                onClick={() => navigate("/inventory")}
              >
                Continue Shopping
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/profile")}
              >
                View My Orders
              </button>
            </div>

            <p className="secure-note">
              🌱 Your wellness journey continues with nature
            </p>

          </div>

        </div>
      </div>
    </>
  );
}

export default Success;