import { ordersData } from "./adminData";
import "../styles/admin.css";

function OrdersAdmin() {
  return (
    <div className="admin-bg">
      <div className="admin-panel">

        <h2>Orders</h2>

        {ordersData.map(o => (
          <div className="row-card" key={o.id}>
            <p>{o.user}</p>
            <p>₹{o.amount}</p>
            <p>{o.status}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default OrdersAdmin;