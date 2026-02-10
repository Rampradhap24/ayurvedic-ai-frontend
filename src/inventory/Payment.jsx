import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/payment.css";

import { useCart } from "../context/CartContext";
import { createOrder } from "../services/order.api";

function Payment() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const token = localStorage.getItem("token");

  const hasProcessed = useRef(false); // ✅ PREVENT DOUBLE RUN
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (cart.length === 0) {
      navigate("/inventory", { replace: true });
      return;
    }

    const processPayment = async () => {
      try {
        const totalAmount = cart.reduce(
          (sum, item) => sum + item.price * (item.qty || 1),
          0
        );

        // ⏱ simulate UPI delay
        await new Promise((res) => setTimeout(res, 5000));

        // ✅ SAVE ORDER FIRST
        await createOrder(
          {
            items: cart.map((item) => ({
              product: item._id,
              productName: item.name,
              productPrice: item.price,
              productImage: item.image,
              quantity: item.qty || 1,
            })),
            totalAmount,
          },
          token
        );

        // ✅ CLEAR CART AFTER SAVE
        clearCart();

        // ✅ ALWAYS GO TO SUCCESS
        navigate("/success", { replace: true });

      } catch (err) {
        console.error("Payment failed:", err);
        navigate("/cart", { replace: true });
      } finally {
        setProcessing(false);
      }
    };

    processPayment();
  }, []); // ✅ RUN ONCE ONLY

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <>
      <Navbar />

      <div className="payment-bg">
        <div className="payment-wrapper">
          <div className="payment-card">

            <h2>Pay using UPI</h2>

            <div className="upi-qr-box">
              <img
                src={new URL("../assets/upi-qr.png", import.meta.url).href}
                alt="UPI QR"
              />
            </div>

            <div className="upi-amount">
              Pay <span>₹{totalAmount}</span>
            </div>

            <p className="secure-text">
              🔒 {processing
                ? "Payment processing… Please wait"
                : "Payment complete"}
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;