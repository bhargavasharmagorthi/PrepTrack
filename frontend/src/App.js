// frontend/src/App.js
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

// 🚀 New imports for layout + pages
import LandingLayout from "./layouts/LandingLayout";
import Dashboard from "./pages/Dashboard";
import TakeTest from "./pages/TakeTest";
import MyTests from "./pages/MyTests";
import Performance from "./pages/Performance";
import Targets from "./pages/Targets";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function PlaceholderHome() {
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // (Optional) Check backend
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Connecting to Backend..."));

    // Auto redirect
    const timer = setTimeout(() => {
      if (user && user.token) {
        navigate("/app/dashboard"); // NEW redirect path
      } else {
        navigate("/home");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-3">PrepTrack</h1>
      <p className="text-gray-700 text-lg">{message}</p>
      <p className="text-gray-500 mt-2">Loading...</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auto redirect splash */}
        <Route path="/" element={<PlaceholderHome />} />

        {/* Public pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 🔐 PROTECTED DASHBOARD LAYOUT */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <LandingLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested Dashboard Routes */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="take-test" element={<TakeTest />} />
          <Route path="my-tests" element={<MyTests />} />
          <Route path="performance" element={<Performance />} />
          <Route path="targets" element={<Targets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

console.log("LandingLayout:", LandingLayout);
console.log("Dashboard:", Dashboard);
console.log("TakeTest:", TakeTest);
console.log("MyTests:", MyTests);
console.log("Performance:", Performance);
console.log("Targets:", Targets);
console.log("Profile:", Profile);
console.log("Settings:", Settings);