import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useContext(AuthContext);

  // 1) Not logged in → redirect to login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // 2) Role-based restriction (admin/user)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/app/dashboard" replace />;
  }

  // 3) Access granted
  return children;
}