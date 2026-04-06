import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);
  const location = useLocation();

  // ⏳ Wait until auth is loaded
  if (loading) {
    return <div className="text-center mt-10">Checking auth...</div>;
  }

  // 🔐 If not logged in → redirect
  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;