import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import TripDetails from "./pages/TripDetails";
import AdminRoute from "./utils/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
// Layout
import DashboardLayout from "./layouts/DashboardLayout";


// Auth
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

function App() {
  return (
   
      <Routes>

        {/* 🌐 Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route path="" element={<Dashboard />} />
          <Route path="trip/:id" element={<TripDetails />} />


        </Route>

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
  );
}

export default App;