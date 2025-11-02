import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="bg-white rounded-xl shadow-lg w-96 p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="white"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm0 0c0 3.314 2.686 6 6 6v3a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1a1 1 0 00-1 1v3c-3.314 0-6 2.686-6 6z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Enter your registered email address, and we’ll send you a link to
          reset your password.
        </p>

        <form>
          <div className="mb-6 text-left">
            <label className="block text-gray-600 mb-1 text-sm">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 w-full rounded-md hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>

            <p className="text-sm text-gray-600 mt-4">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Back to login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
