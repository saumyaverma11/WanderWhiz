

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null
  });

  const [loading, setLoading] = useState(true); // 🔥 IMPORTANT

  useEffect(() => {
    const stored = localStorage.getItem("auth");

    if (stored) {
      setAuth(JSON.parse(stored));
    }

    setLoading(false); // 🔥 wait complete
  }, []);

  const login = (data) => {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};