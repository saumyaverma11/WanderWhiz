

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  // 🔥 WAIT FIRST
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // 🔥 CHECK BOTH
  if (!auth?.token || !auth?.user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;