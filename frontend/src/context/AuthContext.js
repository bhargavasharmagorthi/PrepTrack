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
    const subject = localStorage.getItem("subject");
    const adminId = localStorage.getItem("adminId");
  
    if (token && name && role) {
      setUser({ token, name, role, subject, adminId });
    }
  }, []);  

  // ✅ Login: store data in localStorage + context
  const login = ({ token, name, role, subject, adminId }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
  
    if (subject) localStorage.setItem("subject", subject);
    if (adminId) localStorage.setItem("adminId", adminId);
  
    setUser({ token, name, role, subject, adminId });
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