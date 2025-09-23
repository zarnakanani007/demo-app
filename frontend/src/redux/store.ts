import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from'./cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart:cartReducer
  },
});

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch type
export type AppDispatch = typeof store.dispatch;
