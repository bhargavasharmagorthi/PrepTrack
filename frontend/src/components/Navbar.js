import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiAcademicCap, HiMenu, HiX, HiUser } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Logout handler that clears user first, then redirects
  const handleLogout = async () => {
    await logout(); // wait until user is cleared
    navigate("/home", { replace: true }); // then redirect
  }; 

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <HiAcademicCap className="text-white w-6 h-6" />
          </div>
          <span className="font-extrabold text-lg text-slate-900">PrepTrack</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="#features" className="text-slate-700 hover:text-blue-600 transition font-medium">Features</Link>
          <Link to="#roadmap" className="text-slate-700 hover:text-blue-600 transition font-medium">Roadmap</Link>
          <Link to="#outcomes" className="text-slate-700 hover:text-blue-600 transition font-medium">Outcomes</Link>

          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 rounded-md text-sm border border-slate-200 hover:shadow-sm transition">Login</Link>
              <Link to="/signup" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">Sign Up</Link>
            </>
          ) : (
            <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 bg-gray-50">
              <HiUser className="w-5 h-5 text-gray-700" />
              <span className="font-medium">Hi {user.name}</span>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 hover:text-blue-600 focus:outline-none">
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col px-6 py-4 gap-3">
            <Link to="#features" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-medium">Features</Link>
            <Link to="#roadmap" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-medium">Roadmap</Link>
            <Link to="#outcomes" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-medium">Outcomes</Link>

            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-md text-sm border border-slate-200 hover:shadow-sm">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">Sign Up</Link>
              </>
            ) : (
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 bg-gray-50">
                <HiUser className="w-5 h-5 text-gray-700" />
                <span className="font-medium">Hi {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}