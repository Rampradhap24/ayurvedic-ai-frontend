import Navbar from "../components/Navbar";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-bg">
        <div className="cart-wrapper">
          <div className="cart-card">

            {/* 🔙 BACK BUTTON */}
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
              title="Go back"
            >
              ←
            </button>

            <h2 className="cart-title">My Cart</h2>

            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty 🌿</p>
            ) : (
              <>
                {/* CART ITEMS */}
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-info">
                        <h4>{item.name}</h4>
                        <p className="badge">{item.badge}</p>
                      </div>

                      <div className="cart-price">
                        ₹{item.price}
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* SUMMARY */}
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
                    onClick={() => navigate("/payment")}
                  >
                    Proceed to Payment
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