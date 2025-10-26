// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Initialize user from localStorage when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (token && name && role) {
      setUser({ token, name, role });
    }
  }, []);

  // ✅ Login: store data in localStorage + context
  const login = ({ token, name, role }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    setUser({ token, name, role });
  };

  // ✅ Logout: clear everything and reset state
  const logout = () => {
    return new Promise((resolve) => {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}