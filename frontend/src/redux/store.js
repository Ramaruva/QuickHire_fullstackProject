import { configureStore, } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';
import professionalReducer from './professionalRegisterSlice';
import loadingReducer from './loadingSlice';
import staffReducer from './staffSlicer';
import { thunk } from 'redux-thunk';
import jobReducer from './jobSlice';

// Define the persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'professionalRegister', 'jobSlice'] // Add reducers you want to persist here
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  professionalRegister: professionalReducer,
  loading: loadingReducer,
  staffStates:staffReducer,
  jobSlice:jobReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

// Export the persistor
export const persistor = persistStore(store);
