import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Login Form</h2>

        <div className="flex justify-between mb-6">
          <Link
            to="/login"
            className="w-1/2 text-center py-2 rounded-l-xl bg-blue-600 text-white font-semibold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="w-1/2 text-center py-2 rounded-r-xl border border-gray-300 font-semibold hover:bg-gray-100"
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
            placeholder="Password"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <p className="text-sm text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Not a member?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
