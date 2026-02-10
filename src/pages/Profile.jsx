import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/profile.css";
import { getMyOrders } from "../services/order.api";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  /* ================= AUTH ================= */
  useEffect(() => {
    if (!token || !storedUser) {
      navigate("/login");
    }
  }, [token, storedUser, navigate]);

  /* ================= PROFILE DATA ================= */
  const [details, setDetails] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    workType: "",
  });

  const [tempDetails, setTempDetails] = useState(details);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  /* 🔹 LOAD PROFILE FROM DB */
  useEffect(() => {
    if (!token) return;

    const loadProfile = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setDetails(data);
        setTempDetails(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [token]);

  /* 🔹 SAVE PROFILE TO DB */
  const handleSave = async () => {
    try {
      await fetch("http://localhost:5001/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tempDetails),
      });

      setDetails(tempDetails);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  const handleCancel = () => {
    setTempDetails(details);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ================= ORDERS ================= */
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!token) return;

    const loadOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [token]);


  return (
    <>
      <Navbar />

      <div className="profile-bg page-animate">
        <div className="profile-wrapper">

          {/* ================= LEFT : PROFILE ================= */}
          <div className="profile-card">
            <div className="profile-avatar">
              {storedUser?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="profile-name">{storedUser?.name}</h2>
            <p className="profile-email">{storedUser?.email}</p>

            {[
              { key: "age", label: "Age" },
              { key: "gender", label: "Gender" },
              { key: "height", label: "Height (cm)" },
              { key: "weight", label: "Weight (kg)" },
              { key: "workType", label: "Work Type" },
            ].map(({ key, label }) => (
              <div className="detail-row" key={key}>
                <span className="label">{label}</span>

                {isEditing ? (
                  key === "gender" ? (
                    <select
                      value={tempDetails.gender || ""}
                      onChange={(e) =>
                        setTempDetails({
                          ...tempDetails,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <input
                      type="number"
                      value={tempDetails[key] || ""}
                      onChange={(e) =>
                        setTempDetails({
                          ...tempDetails,
                          [key]: e.target.value,
                        })
                      }
                    />
                  )
                ) : (
                  <span className="value">
                    {details[key] || "—"}
                  </span>
                )}
              </div>
            ))}

            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* ================= RIGHT : PURCHASED MEDICINES ================= */}
          <div className="profile-right">
            <div className="glass-section scrollable">
              <h3>Purchased Medicines</h3>

              {loadingOrders ? (
                <p className="empty-text">Loading orders…</p>
              ) : orders.length === 0 ? (
                <p className="empty-text">
                  No medicines purchased yet 🌿
                </p>
              ) : (
                orders.map((order) => (
                  <div className="order-item" key={order._id}>
                    <div>
                      <h4>Order #{order._id.slice(-6)}</h4>
                      <p className="order-date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      {order.items.map((item, idx) => (
  <p key={`${order._id}-${idx}`}>
    💊 {item.productName || item.product?.name || "Unknown Medicine"} × {item.quantity}
  </p>
))}
                    </div>

                    <div className="order-right">
                      <span className="order-amount">
                        ₹{order.totalAmount}
                      </span>
                      <span className="order-status delivered">
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;