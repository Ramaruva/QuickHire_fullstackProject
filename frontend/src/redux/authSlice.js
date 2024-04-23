import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { getLocalItem, removeItem } from "../localStrorage";
import axios from "axios";
import { postRequest } from "../API/config";

const initialState = {
  isAuthenticated: false,
  user: null,
  notification: { isOpen: false, message: '', type: '' }, // Ensure notification is always an object
};

export const checkAuthenticationAsync = createAsyncThunk(
  "auth/checkAuthentication",
  async () => {
    const token = getLocalItem("token");
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      return decoded;
    }
    throw new Error("Authentication token not found");
  }
);

export const changePasswordAsync = createAsyncThunk(
  "auth/changePassword",
  async ({ username, newPassword }, { rejectWithValue }) => {
    try {
      console.log(username, newPassword)
      const response = await postRequest("changePassword", {
        username: username,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Could not change password"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      console.log(action);
      state.user = action.payload;
      console.log(state.user);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      removeItem("token");
    },
    clearNotification: (state) => {
      state.notification = null;  // Clear the notification state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthenticationAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        return state;
      })
      .addCase(checkAuthenticationAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        removeItem("token");
        return state;
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        // Check if the response is true (success)
        if (action.payload) {
          state.notification = { message: "Password changed successfully", type: "success" };
        } else {
          state.notification = { message: "Password change failed", type: "error" };
        }
        return state;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.notification = { message: action.payload || "Password change failed", type: "error" };
        return state;
      });
  },
});
export const { setCredentials, logout, clearNotification } = authSlice.actions;

export default authSlice.reducer;

//checking for the token and decoding the token
