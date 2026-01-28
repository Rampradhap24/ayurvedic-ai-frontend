import Navbar from "../components/Navbar";
import "../styles/success.css";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="success-bg">
        <div className="success-wrapper">

          <div className="success-card">

            {/* 🔙 BACK BUTTON */}
            <button
              className="back-btn"
              onClick={() => navigate("/payment")}
              title="Back to Dashboard"
            >
              ←
            </button>

            <div className="success-icon">✅</div>

            <h2>Order Placed Successfully</h2>
            <p className="success-sub">
              Thank you 🌿
            </p>

            <div className="success-info">
              <div className="row">
                <span>Order ID</span>
                <span>#AYH10239</span>
              </div>
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