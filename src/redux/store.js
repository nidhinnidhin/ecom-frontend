import { configureStore } from '@reduxjs/toolkit';
import cartCountReducer from "./cartCountSlice";

export const store = configureStore({
  reducer: {
    cartCount: cartCountReducer,
  },
});