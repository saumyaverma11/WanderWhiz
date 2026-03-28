import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { auth } = useContext(AuthContext);

  // ❌ Not logged in
  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  // ❌ Not admin
  if (auth.user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  // ✅ Admin allowed
  return children;
}

export default AdminRoute;