// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// function AdminRoute({ children }) {
//   const { auth } = useContext(AuthContext);

//   // ❌ Not logged in
//   if (!auth?.user) {
//     return <Navigate to="/login" />;
//   }

//   // ❌ Not admin
//   if (auth.user.role !== "admin") {
//     return <Navigate to="/dashboard" />;
//   }

//   // ✅ Admin allowed
//   return children;
// }

// export default AdminRoute;


import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function AdminRoute({ children }) {
  const { auth, loading } = useContext(AuthContext);
  const location = useLocation();

  // ⏳ WAIT until auth loads (VERY IMPORTANT)
  if (loading) {
    return <div className="text-center mt-10">Checking admin...</div>;
  }

  // ❌ Not logged in
  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ Not admin
  if (auth?.user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Admin allowed
  return children;
}

export default AdminRoute;