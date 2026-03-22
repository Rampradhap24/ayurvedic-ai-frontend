import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function OrdersAdmin() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5001/api/admin/orders"
      );

      if (!res.ok) {
        const text = await res.text();
        console.log("ERROR:", text);
        alert("Failed to fetch orders");
        return;
      }

      const data = await res.json();
      setOrders(data);

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= DELETE ORDER ================= */
  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/admin/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("✅ Order deleted successfully");

      // 🔥 Refresh list
      fetchOrders();

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="admin-bg">
      <div className="admin-panel">

        {/* ===== HEADER ===== */}
        <div className="admin-header">
          <div>
            <h2>📦 Orders</h2>
            <p className="sub">Track all customer orders</p>
          </div>

          <button
            className="small-btn back-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ⬅ Back
          </button>
        </div>

        {/* ===== LOADING ===== */}
        {loading && <p>Loading orders...</p>}

        {/* ===== EMPTY ===== */}
        {!loading && orders.length === 0 && (
          <p>No orders found</p>
        )}

        {/* ===== LIST ===== */}
        <div className="admin-table">
          {orders.map((o) => (
            <div className="row-card" key={o._id}>

              <p><strong>User:</strong> {o.user?.name || "N/A"}</p>

              <p><strong>Email:</strong> {o.user?.email || "N/A"}</p>

              <p><strong>Amount:</strong> ₹{o.totalAmount}</p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(o.createdAt).toLocaleDateString()}
              </p>

              {/* ===== MEDICINES ===== */}
              <div style={{ marginTop: "10px" }}>
                <strong>Medicines:</strong>

                {o.items?.length === 0 && (
                  <p style={{ color: "#ccc" }}>No items</p>
                )}

                {o.items?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "6px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <span style={{ fontWeight: "500" }}>
                      {item.product?.name || "Medicine"}
                    </span>

                    <span style={{ color: "#ccc" }}>
                      Qty: {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* 🔥 DELETE BUTTON */}
              <div style={{ marginTop: "12px", textAlign: "right" }}>
                <button
                  className="delete-btn"
                  onClick={() => deleteOrder(o._id)}
                >
                  🗑 Delete Order
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default OrdersAdmin;