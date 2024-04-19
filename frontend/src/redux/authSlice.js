import { createSlice } from "@reduxjs/toolkit";
import  {jwtDecode} from "jwt-decode"
const initialState = {
    isAuthenticated:false,
    user:null,
};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) =>{
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state)=>{
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('token');
        }
    }
});
export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;

//checking for the token and decoding the token
export function checkAuthentication(dispatch){
    const token = localStorage.getItem('token');
    if (token){
        const decoded = jwtDecode(token) ;
        dispatch(setCredentials(decoded))
    }
}



