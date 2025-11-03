import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👈 Add icons

const Signup = () => {
  // 👇 Add state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Signup Form</h2>

        <div className="flex justify-between mb-6">
          <Link
            to="/login"
            className="w-1/2 text-center py-2 rounded-l-xl border border-gray-300 font-semibold hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="w-1/2 text-center py-2 rounded-r-xl bg-blue-600 text-white font-semibold"
          >
            Signup
          </Link>
        </div>

        <form>
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
          />

          {/* Password Field with Eye Icon */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password Field with Eye Icon */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already a member?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
