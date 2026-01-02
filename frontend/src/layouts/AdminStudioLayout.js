// frontend/src/layouts/AdminStudioLayout.js
import React, { useState, useContext } from "react";
import {
  HiHome,
  HiDocumentText,
  HiPencilAlt,
  HiPlus,
  HiUsers,
  HiChartBar,
  HiCog,
  HiBell,
  HiUserCircle,
  HiSearch,
  HiCollection,
} from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";

export default function AdminStudioLayout() {
  const [activeTab, setActiveTab] = useState("Admin Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: "Admin Dashboard", icon: <HiHome />, path: "/admin-studio" },
    { name: "Chapters", icon: <HiDocumentText />, path: "/admin-studio/chapters" },
    { name: "Topics", icon: <HiPencilAlt />, path: "/admin-studio/topics" },
    { name: "Question Bank", icon: <HiCollection />, path: "/admin-studio/question-bank" },
    { name: "Create Test", icon: <HiPlus />, path: "/admin-studio/create-test" },
    { name: "Test Analytics", icon: <HiChartBar />, path: "/admin-studio/analytics" },
    { name: "User Insights", icon: <HiUsers />, path: "/admin-studio/user-insights" },
    { name: "Admin Settings", icon: <HiCog />, path: "/admin-studio/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* LEFT SIDEBAR */}
      <div
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white flex flex-col transition-all duration-300`}
      >
        <h2 className="text-2xl font-bold text-center py-6">
          {sidebarOpen ? "Admin Studio" : "AS"}
        </h2>

        <ul className="flex-1">
          {sidebarItems.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setActiveTab(item.name);
              }}
              className={`flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-gray-700 ${
                activeTab === item.name ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAVBAR */}
        <div className="h-16 bg-white shadow flex items-center px-6 justify-between">
          <div className="w-10"></div>

          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-96">
            <HiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search chapters, topics, tests..."
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Create Test
            </button>
            <HiBell size={22} className="text-gray-600 cursor-pointer" />
            <div className="flex items-center gap-2">
              <HiUserCircle size={28} className="text-gray-600" />
              <span className="text-gray-700 font-medium">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">
              Logout
            </button>
          </div>
        </div>

        {/* CHILD ROUTES RENDER HERE */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}