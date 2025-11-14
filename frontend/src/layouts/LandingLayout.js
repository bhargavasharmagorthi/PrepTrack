// src/layouts/LandingLayout.js
import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  const { user } = useContext(AuthContext);

  // Sidebar states
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Required when user context is loading
  if (user === undefined) {
    return (
      <div className="pt-24 text-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <Navbar />

      {/* MAIN AREA */}
      <div className="flex flex-1 pt-20 relative min-h-[calc(100vh-5rem)]">

        {/* SIDEBAR */}
        <Sidebar
          expanded={expanded}
          setExpanded={setExpanded}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* PAGE CONTENT FROM ROUTES */}
        <main className="flex-1 p-8">
          <Outlet />   {/* This loads Dashboard, TakeTest, MyTests etc */}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t shadow-sm text-center py-3 text-sm text-gray-600">
        © {new Date().getFullYear()} PrepTrack — Empowering Students for IIT Success
      </footer>
    </div>
  );
}