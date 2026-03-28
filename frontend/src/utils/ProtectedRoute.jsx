// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;