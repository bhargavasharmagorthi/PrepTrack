import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function PlaceholderHome() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch backend message
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("❌ Error fetching:", err));

    // Redirect after 2-3 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-3">PrepTrack</h1>
      <p className="text-gray-700 text-lg">
        {message || "Connecting to backend..."}
      </p>
      <p className="text-gray-500 mt-2">
        Redirecting to <span className="font-semibold text-blue-600">Home</span>...
      </p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Splash / Placeholder */}
      <Route path="/" element={<PlaceholderHome />} />

      {/* Main site */}
      <Route path="/home" element={<Home />} />

      {/* Authentication pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;