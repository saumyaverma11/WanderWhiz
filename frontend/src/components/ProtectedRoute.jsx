// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   return user ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;