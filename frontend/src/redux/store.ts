import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import reviewReducer from './reviewSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    reviews:reviewReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // ✅ explicitly enable devtools
});

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch type
export type AppDispatch = typeof store.dispatch;
