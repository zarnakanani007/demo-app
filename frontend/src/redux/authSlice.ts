// import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// // -------------------- Types --------------------
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatar: string | null;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   error: null,
// };

// // -------------------- Thunks --------------------

// // Register
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (data: { name: string; email: string; password: string; role: string }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", data);
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Registration failed");
//     }
//   }
// );

// // Login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (data: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", data);
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// // Google Login
// export const googleLogin = createAsyncThunk(
//   "auth/googleLogin",
//   async (token: string, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/google", { token });
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Google login failed");
//     }
//   }
// );

// // -------------------- Slice --------------------
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(registerUser.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Google Login
//       .addCase(googleLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleLogin.fulfilled, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(googleLogin.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {setCredentails, logout } = authSlice.actions;
// export default authSlice.reducer;


// src/redux/authSlice.ts
import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

// User type
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

// Auth state
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions; // ✅ named export
export default authSlice.reducer; // ✅ default export
