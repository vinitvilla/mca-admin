import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './modules/auth/reducer';
import contentReducer from './modules/content/reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;