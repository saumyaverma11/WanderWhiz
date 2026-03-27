// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       setUser({ token });
//     }
//   }, []);

//   const login = (data) => {
//     localStorage.setItem("token", data.token);
//     setUser(data.usetear);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null
  });

  // ✅ Load from localStorage on refresh
  useEffect(() => {
    const storedData = localStorage.getItem("auth");

    if (storedData) {
      setAuth(JSON.parse(storedData));
    }
  }, []);

  // ✅ Login function
  const login = (data) => {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  // ✅ Logout function
  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};