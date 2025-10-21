import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // List of protected paths
  const protectedPaths = ["/landing"]; // add other protected pages here

  // Only redirect if user is not logged in AND trying to access a protected route
  if (!user && protectedPaths.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in or route is not protected → render normally
  return children;
}