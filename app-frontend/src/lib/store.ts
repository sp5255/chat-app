import authReducer from "@/lib/features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};
