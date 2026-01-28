import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/payment.css";

function Payment() {
  const navigate = useNavigate();

  // ⏱ AUTO REDIRECT AFTER 5 SECONDS
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/success");
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="payment-bg">
      <div className="payment-wrapper">
        <div className="payment-card">

          {/* BACK BUTTON – RIGHT */}
          <button
            className="back-btn"
            onClick={() => navigate("/inventory")}
            title="Go back"
          >
            ←
          </button>

          <h2>Pay using UPI</h2>
          <p className="payment-sub">
            Scan QR with any UPI app <br />
            <small>(Redirecting after payment…)</small>
          </p>

          {/* QR IMAGE */}
          <div className="upi-qr-box">
            <img
              src={new URL("../assets/upi-qr.png", import.meta.url).href}
              alt="UPI QR"
            />
          </div>

          <div className="upi-amount">
            Pay <span>₹1,299</span>
          </div>

          <p className="secure-text">
            🔒 Secure UPI Payment <br />
            Redirecting to confirmation page in 5 seconds…
          </p>

        </div>
      </div>
    </div>
  );
}

export default Payment;