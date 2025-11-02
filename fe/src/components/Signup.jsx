import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
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
          <input
            type="email"
            placeholder="Email Address"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="password"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="coniferm-Password"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
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
