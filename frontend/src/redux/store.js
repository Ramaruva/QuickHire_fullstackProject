import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import professionalReducer from './professionalRegisterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    professionalRegister:professionalReducer
  },
});
