import React, { createContext, useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // ✅ Initialize from token
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const isTokenExpired = decoded.exp * 1000 < Date.now();
          if (isTokenExpired) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // ✅ Listen for changes in localStorage (when user logs in or logs out)
    const handleStorageChange = (event) => {
      if (event.key === "token") checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
