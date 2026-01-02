// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiHome,
  HiBeaker,
  HiDocumentText,
  HiChartBar,
  HiPresentationChartLine,
  HiUser,
  HiCog,
  HiMenu,
  HiX,
} from "react-icons/hi";

export default function Sidebar({
  expanded,
  setExpanded,
  mobileOpen,
  setMobileOpen,
}) {
  const location = useLocation();

  const sidebarItems = [
    { label: "Dashboard", path: "/app/dashboard", icon: <HiHome className="w-5 h-5" /> },
    { label: "Take Test", path: "/app/take-test", icon: <HiBeaker className="w-5 h-5" /> },
    { label: "My Tests", path: "/app/my-tests", icon: <HiDocumentText className="w-5 h-5" /> },
    { label: "Performance", path: "/app/performance", icon: <HiChartBar className="w-5 h-5" /> },
    { label: "Targets", path: "/app/targets", icon: <HiPresentationChartLine className="w-5 h-5" /> },
    { label: "Profile", path: "/app/profile", icon: <HiUser className="w-5 h-5" /> },
    { label: "Settings", path: "/app/settings", icon: <HiCog className="w-5 h-5" /> },
  ];

  const sidebarVariants = {
    collapsed: { width: 72 },
    expanded: { width: 260 },
  };

  const drawerVariants = {
    closed: { x: "100%" },
    open: { x: 0 },
  };

  return (
    <>
      {/* MOBILE HAMBURGER */}
      <div className="md:hidden fixed top-24 left-4 z-50">
        <button
          className="p-2 bg-white rounded-md shadow"
          onClick={() => setMobileOpen(true)}
        >
          <HiMenu className="h-6 w-6" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <motion.aside
        className="md:hidden fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl border-l"
        initial="closed"
        animate={mobileOpen ? "open" : "closed"}
        variants={drawerVariants}
        transition={{ type: "tween", duration: 0.22 }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-lg font-semibold">Menu</div>
          <button onClick={() => setMobileOpen(false)}>
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-1 overflow-auto h-full">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`w-full flex items-center gap-3 px-2 py-3 rounded-lg 
                  ${active ? "bg-blue-600 text-white" : "hover:bg-gray-50 text-gray-700"}
                `}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </motion.aside>

      {/* DESKTOP SIDEBAR */}
      <motion.aside
        className="hidden md:flex bg-white shadow-lg border-r border-gray-100 flex-col py-6 self-stretch"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        animate={expanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
      >
        <div className="flex-1 overflow-auto py-2">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 rounded-lg p-2 text-sm
                  ${active ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-50"}
                `}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-md
                    ${active ? "bg-white/20" : "bg-white"}
                  `}
                >
                  {item.icon}
                </div>

                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="whitespace-nowrap font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </div>
      </motion.aside>
    </>
  );
}