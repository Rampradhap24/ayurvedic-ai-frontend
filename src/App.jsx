import { Routes, Route } from "react-router-dom";

/* ================= USER ================= */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Consultation from "./pages/Consultation";
import Doctors from "./pages/Doctors";
import Profile from "./pages/Profile";

/* ================= INVENTORY ================= */
import Inventory from "./inventory/Inventory";
import Cart from "./inventory/Cart";
import Payment from "./inventory/Payment";
import Success from "./inventory/Success";

/* ================= ADMIN ================= */
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ReportsAdmin from "./admin/ReportsAdmin";
import UsersAdmin from "./admin/UsersAdmin";
import InventoryAdmin from "./admin/InventoryAdmin";
import ConsultationsAdmin from "./admin/ConsultationsAdmin";
import OrdersAdmin from "./admin/OrdersAdmin";
import AdminAppointments from "./admin/AdminAppointments"; // ✅ FIXED PATH
import AdminProtectedRoute from "./admin/AdminProtectedRoute";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* USER */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/profile" element={<Profile />} />

      {/* INVENTORY */}
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />

      {/* ADMIN */}
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <AdminProtectedRoute>
            <ReportsAdmin />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <UsersAdmin />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/inventory"
        element={
          <AdminProtectedRoute>
            <InventoryAdmin />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/consultations"
        element={
          <AdminProtectedRoute>
            <ConsultationsAdmin />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <OrdersAdmin />
          </AdminProtectedRoute>
        }
      />

      {/* ✅ APPOINTMENTS FIXED */}
      <Route
        path="/admin/appointments"
        element={
          <AdminProtectedRoute>
            <AdminAppointments />
          </AdminProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;