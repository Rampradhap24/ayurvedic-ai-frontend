import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { medicines } from "./data";
import "./inventory.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const [search, setSearch] = useState("");
  const [dbItems, setDbItems] = useState([]);
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch(
          "http://localhost:5001/api/inventory"
        );

        const data = await res.json();
        setDbItems(data);

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchInventory();
  }, []);

  /* ================= NORMALIZE ================= */
  const normalize = (str) =>
    str?.replace(/\s+/g, "").toLowerCase();

  /* ================= MERGE STATIC + DB ================= */
  const mergedMedicines = [
    // 🔹 STATIC ITEMS (UPDATED WITH DB)
    ...medicines.map((item) => {
      const dbItem = dbItems.find(
        (db) => normalize(db.name) === normalize(item.name)
      );

      return {
        ...item,

        // ✅ IMPORTANT FIX
        _id: dbItem?._id || item.id,

        price: dbItem ? dbItem.price : item.price,
        discount: dbItem ? dbItem.discount : 0,
        stock: dbItem ? dbItem.stock : 0,

        image: item.image, // keep static image
      };
    }),

    // 🔹 NEW DB ITEMS
    ...dbItems
      .filter(
        (db) =>
          !medicines.some(
            (item) =>
              normalize(item.name) === normalize(db.name)
          )
      )
      .map((db) => ({
        _id: db._id, // ✅ VERY IMPORTANT

        name: db.name,
        price: db.price,
        discount: db.discount || 0,
        stock: db.stock || 0,

        image: db.image
          ? db.image.startsWith("http") ||
            db.image.startsWith("data")
            ? db.image
            : `http://localhost:5001${db.image}`
          : "https://dummyimage.com/200x200/ccc/000&text=No+Image",
      })),
  ];

  /* ================= SEARCH ================= */
  const filteredMedicines = mergedMedicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="inventory-bg">
        <div className="inventory-wrapper">

          {/* ===== ACTION BAR ===== */}
          <div className="inventory-action-bar">
            <div
              className="action-btn"
              onClick={() => navigate("/cart")}
            >
              🛒 Cart
              {cart.length > 0 && (
                <span className="action-badge">
                  {cart.length}
                </span>
              )}
            </div>

            <div
              className="action-btn primary"
              onClick={() => navigate("/payment")}
            >
              💳 Pay Now
            </div>
          </div>

          {/* ===== PROMO ===== */}
          <div className="promo-banner">
            <div className="promo-text">
              <span className="promo-tag">
                JUST LAUNCHED
              </span>
              <h2>Explore Trusted Ayurvedic Medicines</h2>
              <p>Improve immunity, energy and wellness.</p>
            </div>

            <div className="promo-image">
              <img
                src={new URL(
                  "../assets/curecelltop.jpg",
                  import.meta.url
                ).href}
                alt="CureCell"
              />
            </div>
          </div>

          {/* ===== SEARCH ===== */}
          <div className="inventory-header">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search medicines..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* ===== PRODUCTS ===== */}
          <div className="inventory-grid">
            {filteredMedicines.length === 0 ? (
              <p className="no-results">
                No medicines found
              </p>
            ) : (
              filteredMedicines.map((item, index) => {
                const finalPrice =
                  item.discount > 0
                    ? item.price -
                      (item.price * item.discount) / 100
                    : item.price;

                return (
                  <div
                    className="medicine-card"
                    key={item._id || index}
                  >
                    {item.badge && (
                      <span className="badge">
                        {item.badge}
                      </span>
                    )}

                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) =>
                        (e.target.src =
                          "https://dummyimage.com/200x200/ccc/000&text=No+Image")
                      }
                    />

                    <h4>{item.name}</h4>

                    {/* PRICE */}
                    <div className="price-row">
                      <span className="price">
                        ₹{finalPrice}
                      </span>

                      {item.discount > 0 && (
                        <>
                          <span className="mrp">
                            ₹{item.price}
                          </span>
                          <span className="offer">
                            {item.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* STOCK */}
                    {item.stock === 0 && (
                      <p style={{ color: "red" }}>
                        Out of Stock
                      </p>
                    )}

                    {/* ✅ FIXED ADD TO CART */}
                    <button
                      disabled={item.stock === 0}
                      onClick={() =>
                        addToCart({
                          _id: item._id, // 🔥 IMPORTANT
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          qty: 1,
                        })
                      }
                    >
                      {item.stock === 0
                        ? "Unavailable"
                        : "Add to Cart"}
                    </button>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Inventory;