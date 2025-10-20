import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // Simple placeholder page to verify backend connectivity
  const PlaceholderHome = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
      fetch("http://localhost:5000/api/test")
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch((err) => console.error("❌ Error fetching:", err));
    }, []);

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl font-bold text-blue-600 mb-3">PrepTrack</h1>
        <p className="text-gray-700 text-lg">
          {message || "Connecting to the backend..."}
        </p>
        <p className="text-gray-500 mt-2">
          Once connected, navigate to <span className="font-semibold text-blue-600">/home</span> to view the main site.
        </p>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Default route for backend connectivity check */}
        <Route path="/" element={<PlaceholderHome />} />
        
        {/* Main Home Page */}
        <Route path="/home" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
