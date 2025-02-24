import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from "./modules/auth/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;