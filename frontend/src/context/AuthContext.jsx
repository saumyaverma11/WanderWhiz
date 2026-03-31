

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null
  });

  const [loading, setLoading] = useState(true); // 🔥 IMPORTANT

  // useEffect(() => {
  //   const stored = localStorage.getItem("auth");

  //   if (stored) {
  //     setAuth(JSON.parse(stored));
  //   }

  //   setLoading(false); // 🔥 wait complete
  // }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");

      if (stored && stored !== "undefined" && stored !== "null") {
        const parsed = JSON.parse(stored);

        // ✅ Extra safety: check structure
        if (parsed?.token && parsed?.user) {
          setAuth(parsed);
        } else {
          localStorage.removeItem("auth");
        }
      }
    } catch (error) {
      console.error("Auth parse error:", error);
      localStorage.removeItem("auth");
    }

    setLoading(false);
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