import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const BASE_URL = import.meta.env.VITE_BASE_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Login success:", response.data);

    // If backend returns a token, store it
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

   toast.success("Login successful! 🎉");
    navigate("/home"); // Redirect after success
  } catch (err) {
    console.error("Login failed:", err);
    toast.error("Invalid email or password");
    setError(err.response?.data?.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};

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

       <form onSubmit={handleSubmit}>
  <input
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
  />
  <div className="relative mb-2">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
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

  <p className="text-sm text-right mb-4">
    <Link to="/forgot-password" className="text-blue-600 hover:underline">
      Forgot password?
    </Link>
  </p>

  <button
    type="submit"
    disabled={loading}
    className={`w-full py-2 rounded-md text-white transition ${
      loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {loading ? "Logging in..." : "Login"}
  </button>
</form>

{error && <p className="text-red-600 text-sm text-center mt-3">{error}</p>}

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
