import { Routes, Route, Navigate } from "react-router-dom";

// 🌐 Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// 👤 User Pages
import Dashboard from "./pages/Dashboard";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/MyTrips";
import Profile from "./pages/Profile";

// 🛠 Admin Page
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/admin/Users";
import Trips from "./pages/admin/Trips";
import AdminDashboard from "./pages/admin/AdminDashboard";


// 🧩 Layout
import DashboardLayout from "./layouts/DashboardLayout";

// 🔐 Auth
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";

import About from "./pages/About";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function App() {
  return (

    <Routes>

      {/* 🌐 Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
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
        <Route index element={<Dashboard />} />
        <Route path="trip/:id" element={<TripDetails />} />
        <Route path="trips" element={<MyTrips />} />
        <Route path="profile" element={<Profile />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="trips" element={<Trips />} />
      </Route>






      {/* ❌ Fallback */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes >
  );
}

export default App;