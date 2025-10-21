// src/pages/Landing.js
import React from "react";
import Navbar from "../components/Navbar";

export default function Landing() {
  const name = localStorage.getItem("name"); // stored during login

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Page content with top padding to avoid overlap with fixed Navbar */}
      <div className="pt-20 min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {name}!</h1>
        <p className="mb-6">This is your landing page. Access restricted content here.</p>

        {/* Sample content */}
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Sample Content Section</h2>
          <p>Here you can show dashboard content, courses, tests, etc.</p>
        </div>
      </div>
    </div>
  );
}