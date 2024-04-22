import { configureStore, } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import professionalReducer from './professionalRegisterSlice';
import loadingReducer from './loadingSlice';
import { thunk } from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    professionalRegister: professionalReducer,
    loading: loadingReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)// Include Redux Thunk directly in the middleware array
});
