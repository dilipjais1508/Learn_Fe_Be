import React from "react";
import { Link } from "react-router-dom"; // 👈 add this import

const ResetPassword = () => {
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
                d="M15 10l4.553-4.553a2.121 2.121 0 00-3-3L12 7m-1 1l-2 2m3-3l2 2m-2-2v9m0 0l-2 2m2-2l2 2"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Reset Password
        </h2>

        <form>
          <div className="mb-4 text-left">
            <label className="block text-gray-600 mb-1 text-sm">
              New Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block text-gray-600 mb-1 text-sm">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-blue-600 w-full text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Continue
            </button>

            {/* ✅ Added this text section below the button */}
            <p className="text-sm text-gray-600 mt-4">
              Remember your password?{" "}
              <Link
                to="/login+"
                className="text-blue-600 font-medium hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
