import Navbar from "../components/Navbar";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  /* 🔐 AUTH GUARD */
  if (!token || !user) {
    navigate("/login");
    return null;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  /* 💳 GO TO PAYMENT PAGE */
  const handlePayment = () => {
    if (cart.length === 0) return;
    navigate("/payment"); // ✅ ONLY THIS
  };

  return (
    <>
      <Navbar />

      <div className="cart-bg page-animate">
        <div className="cart-wrapper">
          <div className="cart-card">

            {/* 🔙 BACK */}
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ←
            </button>

            <h2 className="cart-title">My Cart</h2>

            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty 🌿</p>
            ) : (
              <>
                {/* 🛒 CART ITEMS */}
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item._id || item.id}
                    >
                      <img src={item.image} alt={item.name} />

                      <div className="cart-info">
                        <h4>{item.name}</h4>
                        {item.badge && (
                          <p className="badge">{item.badge}</p>
                        )}
                      </div>

                      <div className="cart-price">
                        ₹{item.price}
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeFromCart(item._id || item.id)
                        }
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* 📦 SUMMARY */}
                <div className="cart-summary">
                  <div className="row">
                    <span>Total Items</span>
                    <span>{cart.length}</span>
                  </div>

                  <div className="row total">
                    <span>Total Amount</span>
                    <span>₹{total}</span>
                  </div>

                  <button
                    className="checkout-btn"
                    onClick={handlePayment}
                  >
                    Pay & Place Order
                  </button>

                  <button
                    className="clear-btn"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;