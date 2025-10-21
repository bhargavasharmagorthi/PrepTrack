// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Initialize user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      setUser({ token, name });
    }
  }, []);

  const login = ({ token, name }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    setUser({ token, name });
  };

  const logout = () => {
    return new Promise((resolve) => {
      setUser(null);
      localStorage.removeItem("user");
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}