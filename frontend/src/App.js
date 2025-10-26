// frontend/src/App.js
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

function PlaceholderHome() {
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    // Fetch backend message
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("❌ Error fetching:", err));

    // Redirect after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-3">PrepTrack</h1>
      <p className="text-gray-700 text-lg">
        {message || "Connecting to backend..."}
      </p>
      <p className="text-gray-500 mt-2">
        Redirecting to{" "}
        <span className="font-semibold text-blue-600">Home</span>...
      </p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Splash / Placeholder */}
        <Route path="/" element={<PlaceholderHome />} />

        {/* Main unprotected site pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Landing page */}
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;