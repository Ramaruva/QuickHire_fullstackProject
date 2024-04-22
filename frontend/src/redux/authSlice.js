import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  {jwtDecode} from "jwt-decode"
import { getLocalItem, removeItem } from "../localStrorage";
const initialState = {
    isAuthenticated:false,
    user:null,
};

export const checkAuthenticationAsync = createAsyncThunk(
    'auth/checkAuthentication',
    async () => {
      const token = getLocalItem("token");
      console.log(token);
      if (token) {
        const decoded = jwtDecode(token);
        return decoded;
      }
      throw new Error('Authentication token not found');
    }
  );

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) =>{
            state.isAuthenticated = true;
            console.log(action);
            state.user = action.payload;
            console.log(state.user);
        },
        logout: (state)=>{
            state.isAuthenticated = false;
            state.user = null;
            removeItem("token");
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
          });
      }
});
export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;

//checking for the token and decoding the token



