import { createSlice } from "@reduxjs/toolkit";
import  {jwtDecode} from "jwt-decode"
import { getLocalItem, removeItem } from "../localStrorage";
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
            console.log(action);
            state.user = action.payload;
            console.log(state.user);
        },
        logout: (state)=>{
            state.isAuthenticated = false;
            state.user = null;
            removeItem("token");
        }
    }
});
export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;

//checking for the token and decoding the token
export function checkAuthentication(dispatch){
    const token = getLocalItem("token");
    if (token){
        const decoded = jwtDecode(token) ;
        console.log(decoded);
        dispatch(setCredentials(decoded))
        return decoded;
    }
}



