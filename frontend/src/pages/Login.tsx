
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  // Prefill email only if passed from Register
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Normal login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ ADDED: Save to localStorage before dispatching
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      dispatch(setCredentials(res.data)); // { token, user }
      navigate("/"); // Redirect to Home after login
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      setMessage("Google login failed!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      // ✅ ADDED: Save to localStorage before dispatching
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      dispatch(setCredentials(res.data)); // { token, user }
      navigate("/"); // Redirect to Home
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setMessage("Google login failed!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96 flex flex-col"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {message && <p className="text-red-500 mb-2 text-center">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white mb-3 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google Login */}
        <div className="flex justify-center mb-3">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>

        <p className="text-sm text-gray-600 text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;