import { Routes, Route } from "react-router-dom";

/* ================= USER PAGES ================= */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Consultation from "./pages/Consultation";
import Doctors from "./pages/Doctors";
import Profile from "./pages/Profile";

/* ================= INVENTORY FLOW ================= */
import Inventory from "./inventory/Inventory";
import Cart from "./inventory/Cart";
import Payment from "./inventory/Payment";
import Success from "./inventory/Success";

/* ================= ADMIN PAGES ================= */
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import UsersAdmin from "./admin/UsersAdmin";
import InventoryAdmin from "./admin/InventoryAdmin";
import ConsultationsAdmin from "./admin/ConsultationsAdmin";
import OrdersAdmin from "./admin/OrdersAdmin";

function App() {
  return (
    <Routes>
      {/* -------- PUBLIC -------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* -------- USER -------- */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/profile" element={<Profile />} />

      {/* -------- INVENTORY -------- */}
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />

      {/* -------- ADMIN -------- */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UsersAdmin />} />
      <Route path="/admin/inventory" element={<InventoryAdmin />} />
      <Route path="/admin/consultations" element={<ConsultationsAdmin />} />
      <Route path="/admin/orders" element={<OrdersAdmin />} />
    </Routes>
  );
}

export default App;