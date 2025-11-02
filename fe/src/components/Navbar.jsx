import React from "react";
import { Bell, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom"; // 👈 use NavLink instead of Link

const Navbar = () => {
  return (
    <nav className="bg-[#264b3e] text-gray-300 px-6 py-3 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* ===== Left: Logo ===== */}
        <div className="flex items-center space-x-2">
          <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
          <span className="text-white font-semibold text-lg">MyCompany</span>
        </div>

        {/* ===== Middle: Navigation Links ===== */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <NavLink
            to="/home"
            end   // ✅ This ensures it matches ONLY the "/" route
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white pb-1"
                : "hover:text-white transition duration-300"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white pb-1"
                : "hover:text-white transition duration-300"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white pb-1"
                : "hover:text-white transition duration-300"
            }
          >
            Services
          </NavLink>
        </div>

        {/* ===== Right: Icons and Logout ===== */}
        <div className="flex items-center space-x-5">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="h-9 w-9 rounded-full border-2 border-gray-600"
          />

          <button className="text-gray-400 hover:text-white">
            <Bell size={22} />
          </button>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition duration-300 flex items-center space-x-1">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
