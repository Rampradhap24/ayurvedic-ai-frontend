import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { medicines as staticMedicines } from "./data"; // 🔥 keep this
import "./inventory.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]); // dynamic list
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  /* ================= FETCH INVENTORY FROM BACKEND ================= */
  useEffect(() => {
    fetch("http://localhost:5001/api/inventory")
      .then((res) => res.json())
      .then((dbData) => {

        const mergedData = dbData.map((item) => {
          const staticMatch = staticMedicines.find(
            (med) =>
              med.name.toLowerCase() === item.name.toLowerCase()
          );

          return {
            ...item,
            image: staticMatch?.image || item.image, // use static image first
          };
        });

        setMedicines(mergedData);
      })
      .catch((err) => console.error("Inventory error:", err));
  }, []);

  const filteredMedicines = medicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* ✅ INVENTORY BACKGROUND (UNCHANGED) */}
      <div className="inventory-bg">
        <div className="inventory-wrapper">

          {/* ✅ FLOATING CART + PAYMENT BAR (UNCHANGED) */}
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

          {/* 🔥 PROMO BANNER (UNCHANGED) */}
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

          {/* 🔍 SEARCH BAR (UNCHANGED) */}
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

          {/* 🧴 PRODUCT GRID (UNCHANGED UI) */}
          <div className="inventory-grid">
            {filteredMedicines.length === 0 ? (
              <p className="no-results">No medicines found</p>
            ) : (
              filteredMedicines.map((item) => (
                <div className="medicine-card" key={item._id}>

                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image")
                    }
                  />

                  <h4>{item.name}</h4>

                  <div className="price-row">
                    <span className="price">₹{item.price}</span>
                  </div>

                  <button
                    disabled={item.stock === 0}
                    onClick={() => addToCart(item)}
                  >
                    {item.stock === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
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