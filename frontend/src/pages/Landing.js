// src/pages/Landing.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Landing.css"; // optional if you created styles

export default function Landing() {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [expanded, setExpanded] = useState(false); // sidebar hover

  return (
    <div className="landing-container">
      {/* Top Navbar */}
      <Navbar />

      <div className="layout-body">
        {/* Sidebar */}
        <Sidebar
          expanded={expanded}
          setExpanded={setExpanded}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <div className="landing-main">
          {user ? (
            <h2>Welcome back, {user.name || "User"} 👋</h2>
          ) : (
            <h2>Welcome to PrepTrack 👋</h2>
          )}

          <p>Select a section from the sidebar to continue.</p>
        </div>
      </div>
    </div>
  );
}