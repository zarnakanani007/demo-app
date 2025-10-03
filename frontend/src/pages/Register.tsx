// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";

// const Register: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [avatar, setAvatar] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // ✅ Avatar preview
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     setName("");
//     setEmail("");
//     setPassword("");
//     setRole("user");
//     setAvatar(null);
//     setAvatarPreview(null);
//   }, []);

//   // Handle avatar file selection
//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setAvatar(file);

//       // Generate preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Normal Register
//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("role", role);
//       if (avatar) formData.append("avatar", avatar);

//       await axios.post("http://localhost:5000/api/auth/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage("Registration successful!");
//       navigate("/login", { state: { email } });

//       // Reset form
//       setName("");
//       setEmail("");
//       setPassword("");
//       setRole("user");
//       setAvatar(null);
//       setAvatarPreview(null);
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || "Registration failed");
//     }
//   };

//   // Google Login Success
//   const handleGoogleSuccess = async (credentialResponse: any) => {
//     try {
//       if (!credentialResponse.credential) {
//         setMessage("Google login failed!");
//         return;
//       }

//       const decoded: any = jwt_decode(credentialResponse.credential);
//       console.log("Google User:", decoded);

//       await axios.post("http://localhost:5000/api/auth/google", {
//         token: credentialResponse.credential,
//       });

//       setMessage("Google login successful!");
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       setMessage("Google login failed!");
//     }
//   };

//   const handleGoogleError = () => {
//     setMessage("Google login failed!");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
//       <form
//         onSubmit={handleRegister}
//         className="bg-white p-6 rounded shadow-md w-96 flex flex-col"
//         autoComplete="off"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//         {message && <p className="text-green-500 mb-2 text-center">{message}</p>}

//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full p-2 border rounded mb-3"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full p-2 border rounded mb-3"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full p-2 border rounded mb-3"
//         />

//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>

//         {/* ✅ Avatar Upload + Preview */}
//         <div className="mb-3">
//           {avatarPreview && (
//             <img
//               src={avatarPreview}
//               alt="Avatar Preview"
//               className="w-24 h-24 rounded-full object-cover mb-2 mx-auto"
//             />
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleAvatarChange}
//             className="w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition mb-3"
//         >
//           Register
//         </button>

//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={handleGoogleError}
//         />

//         <p className="text-sm text-gray-600 text-center mt-3">
//           Already registered?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
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

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (avatar) formData.append("avatar", avatar);

      await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Registration successful!");

      // Navigate to login page and pass **only email**
      navigate("/login", { state: { email } });

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setAvatar(null);
      setAvatarPreview(null);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  // Google Login
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        setMessage("Google login failed!");
        return;
      }

      const decoded: any = jwt_decode(credentialResponse.credential);
      console.log("Google User:", decoded);

      await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      setMessage("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Google login failed!");
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
        {message && <p className="text-green-500 mb-2 text-center">{message}</p>}

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
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition mb-3"
        >
          Register
        </button>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />

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