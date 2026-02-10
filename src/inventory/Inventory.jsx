import { useState } from "react";
import Navbar from "../components/Navbar";
import { medicines } from "./data";
import "./inventory.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const [search, setSearch] = useState("");
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const filteredMedicines = medicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* ✅ INVENTORY BACKGROUND */}
      <div className="inventory-bg">
        <div className="inventory-wrapper">

          {/* ✅ FLOATING CART + PAYMENT BAR (INVENTORY ONLY) */}
          <div className="inventory-action-bar">
            <div
              className="action-btn"
              onClick={() => navigate("/cart")}
            >
              🛒 Cart
              {cart.length > 0 && (
                <span className="action-badge">{cart.length}</span>
              )}
            </div>

            <div
              className="action-btn primary"
              onClick={() => navigate("/payment")}
            >
              💳 Pay Now
            </div>
          </div>

          {/* 🔥 PROMO BANNER */}
          <div className="promo-banner">
            <div className="promo-text">
              <span className="promo-tag">JUST LAUNCHED</span>
              <h2>Explore Trusted Ayurvedic Medicines</h2>
              <p>
                Clinically inspired Ayurvedic blends to strengthen immunity,
                improve energy, and support overall wellness.
              </p>
            </div>

            <div className="promo-image">
              <img
                src={new URL("../assets/curecelltop.jpg", import.meta.url).href}
                alt="CureCell"
              />
            </div>
          </div>

          {/* 🔍 SEARCH BAR */}
          <div className="inventory-header">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* 🧴 PRODUCT GRID */}
          <div className="inventory-grid">
            {filteredMedicines.length === 0 ? (
              <p className="no-results">No medicines found</p>
            ) : (
              filteredMedicines.map((item) => (
                <div className="medicine-card" key={item.id}>

                  {item.badge && (
                    <span className="badge">{item.badge}</span>
                  )}

                  <img src={item.image} alt={item.name} />

                  <h4>{item.name}</h4>

                  <div className="price-row">
                    <span className="price">₹{item.price}</span>
                    <span className="mrp">₹{item.mrp}</span>
                    {item.offer && (
                      <span className="offer">{item.offer}</span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Inventory;