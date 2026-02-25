import { useEffect, useState } from "react";
import "../styles/admin.css";

function InventoryAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    discount: "",
    stock: "",
  });

  const fetchItems = async () => {
    const res = await fetch(
      "http://localhost:5001/api/inventory/admin/all"
    );
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await fetch("http://localhost:5001/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      image: "",
      price: "",
      discount: "",
      stock: "",
    });

    fetchItems();
  };

  const updateItem = async (item) => {
    await fetch(
      `http://localhost:5001/api/inventory/${item._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }
    );

    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(
      `http://localhost:5001/api/inventory/${id}`,
      { method: "DELETE" }
    );
    fetchItems();
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  return (
    <div className="admin-bg">
      <div className="admin-panel">
        <h2>🧴 Inventory Management</h2>

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
              placeholder="Image URL"
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

          <button className="admin-btn" onClick={addItem}>
            ➕ Add Medicine
          </button>
        </div>

        {/* ================= LIST SECTION ================= */}
        <div className="admin-table">
          {items.map((item, index) => (
            <div key={item._id} className="inventory-edit-card">

              <div className="inventory-left">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt=""
                />
              </div>

              <div className="inventory-right">

                <div className="form-grid">
                  <input
                    value={item.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />

                  <input
                    value={item.image || ""}
                    onChange={(e) =>
                      handleChange(index, "image", e.target.value)
                    }
                  />

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