import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // ✅ import type only

// User type
interface User {
  id: string;
  name: string;
  email: string;
}

// Auth state
interface AuthState {
  user: User | null;
  token: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user and token after login
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Logout user
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions
export const { setCredentials, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
