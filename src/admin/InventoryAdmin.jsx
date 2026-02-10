import { useState } from "react";
import { inventoryData } from "./adminData";
import "../styles/admin.css";

function InventoryAdmin() {
  const [items, setItems] = useState(inventoryData);

  const updateItem = (id, field, value) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, [field]: value } : i
    ));
  };

  return (
    <div className="admin-bg">
      <div className="admin-panel">

        <h2>Inventory Management</h2>

        {items.map(item => (
          <div className="row-card" key={item.id}>
            <strong>{item.name}</strong>

            <input
              value={item.price}
              onChange={e => updateItem(item.id,"price",e.target.value)}
            />

            <input
              value={item.stock}
              onChange={e => updateItem(item.id,"stock",e.target.value)}
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default InventoryAdmin;