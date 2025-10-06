import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Handle avatar selection + preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Normal Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (avatar) formData.append("avatar", avatar);

      const res = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ ADDED: Save to localStorage and dispatch for auto-login after registration
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(setCredentials(res.data));
      
      setMessage("Registration successful!");
      navigate("/"); // Redirect to home after successful registration

    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        setMessage("Google login failed!");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      // ✅ ADDED: Save to localStorage and dispatch
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(setCredentials(res.data));
      
      setMessage("Google login successful!");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "Google login failed!");
    }
  };

  const handleGoogleError = () => {
    setMessage("Google login failed!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-96 flex flex-col"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {message && (
          <p className={`mb-2 text-center ${
            message.includes("successful") ? "text-green-500" : "text-red-500"
          }`}>
            {message}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
          autoComplete="new-name"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
          autoComplete="new-email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
          autoComplete="new-password"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          autoComplete="off"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Avatar Upload */}
        <div className="mb-3">
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full object-cover mb-2 mx-auto"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white mb-3 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Google Login */}
        <div className="flex justify-center mb-3">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>

        <p className="text-sm text-gray-600 text-center mt-3">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;