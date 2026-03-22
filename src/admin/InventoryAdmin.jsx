import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function InventoryAdmin() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    discount: "",
    stock: "",
  });

  const [pastedImage, setPastedImage] = useState("");

  /* ================= FETCH ================= */
  const fetchItems = async () => {
    try {
      const res = await fetch(
        "http://localhost:5001/api/inventory/admin/all"
      );
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ================= PASTE IMAGE ================= */
  const handlePaste = (e) => {
    const items = e.clipboardData.items;

    for (let item of items) {
      if (item.type.includes("image")) {
        const file = item.getAsFile();

        const reader = new FileReader();
        reader.onload = (event) => {
          setPastedImage(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  /* ================= ADD ================= */
  const addItem = async () => {
    if (!form.name || !form.price) {
      alert("Name & Price required");
      return;
    }

    if (!pastedImage && !form.image) {
      alert("Please add image (URL or paste)");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5001/api/inventory/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            image: pastedImage || form.image,
            price: Number(form.price),
            discount: Number(form.discount) || 0,
            stock: Number(form.stock) || 0,
            category: "general",
            isActive: true,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add medicine");
        return;
      }

      setSuccessMsg("✅ Medicine added");
      setTimeout(() => setSuccessMsg(""), 2000);

      setForm({
        name: "",
        image: "",
        price: "",
        discount: "",
        stock: "",
      });

      setPastedImage("");
      fetchItems();

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* ================= UPDATE ================= */
  const updateItem = async (item) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/inventory/admin/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: Number(item.price),
            discount: Number(item.discount),
            stock: Number(item.stock),
          }),
        }
      );

      if (!res.ok) {
        alert("Update failed");
        return;
      }

      setSuccessMsg("✅ Updated successfully");
      setTimeout(() => setSuccessMsg(""), 2000);

      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* ================= DELETE ================= */
  const deleteItem = async (id) => {
    try {
      await fetch(
        `http://localhost:5001/api/inventory/admin/${id}`,
        { method: "DELETE" }
      );

      setSuccessMsg("🗑 Deleted successfully");
      setTimeout(() => setSuccessMsg(""), 2000);

      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value === "" ? "" : Number(value);
    setItems(updated);
  };

  return (
    <div className="admin-bg">
      <div className="admin-panel">

        {/* ===== HEADER ===== */}
        <div className="admin-header">
          <div>
            <h2>🧴 Inventory Management</h2>
            <p className="sub">Manage medicines & stock</p>
          </div>

          <button
            className="small-btn back-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ⬅ Back
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <p style={{ color: "#7ed957" }}>{successMsg}</p>
        )}

        {/* ================= ADD SECTION ================= */}
        <div className="admin-add-card">
          <h3>Add New Medicine</h3>

          <div className="form-grid">

            <input
              placeholder="Medicine Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Image URL (or paste below)"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Discount %"
              value={form.discount}
              onChange={(e) =>
                setForm({ ...form, discount: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />
          </div>

          {/* PASTE IMAGE BOX */}
          <div
            onPaste={handlePaste}
            style={{
              border: "2px dashed #7ed957",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            📋 Paste Image Here (Ctrl + V)
          </div>

          {/* PREVIEW */}
          {pastedImage && (
            <img
              src={pastedImage}
              width="100"
              style={{ marginTop: "10px", borderRadius: "10px" }}
            />
          )}

          <button className="admin-btn" onClick={addItem}>
            ➕ Add Medicine
          </button>
        </div>

        {/* ================= LIST ================= */}
        <div className="admin-table">
          {items.map((item, index) => (
            <div key={item._id} className="inventory-edit-card">

              <div className="inventory-left">
                <img
                  src={
                    item.image
                      ? item.image.startsWith("http") ||
                        item.image.startsWith("data")
                        ? item.image
                        : `http://localhost:5001${item.image}`
                      : "https://dummyimage.com/100x100/ccc/000"
                  }
                  alt=""
                />
              </div>

              <div className="inventory-right">

                <div className="form-grid">

                  <input value={item.name} disabled />

                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    value={item.discount || 0}
                    onChange={(e) =>
                      handleChange(index, "discount", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    value={item.stock}
                    onChange={(e) =>
                      handleChange(index, "stock", e.target.value)
                    }
                  />

                </div>

                <div className="btn-group">
                  <button
                    className="admin-btn"
                    onClick={() => updateItem(item)}
                  >
                    💾 Save
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item._id)}
                  >
                    🗑 Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default InventoryAdmin;