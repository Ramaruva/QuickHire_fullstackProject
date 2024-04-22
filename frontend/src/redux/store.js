import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import professionalReducer from './professionalRegisterSlice';
import loadingReducer from './loadingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    professionalRegister:professionalReducer,
    loading: loadingReducer,
  },
});
