import { createSlice } from "@reduxjs/toolkit";
import { USERREQUESTTYPE } from "../types";
import { postRequest } from "../API/config";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  username: "",
  state: "",
  city: "",
  pincode: "",
  companyName: "",
  requestType: USERREQUESTTYPE.newAccount,
  major: "",
  schoolName: "",
  completiontime: "",
  qualifications: [],
  educationList: [],
};

export const professionalRegisterSlice = createSlice({
  name: "professionalRegister",
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setEducationList: (state, action) => {
      state.educationList = action.payload;
    },
    setQualificationList: (state, action) => {
      state.qualifications = action.payload;
    },
    sendData: async (state, action) => {
      // You can update state as needed before sending the request
      let requestData = { ...state };
      console.log(requestData);
      let data = await postRequest("professionalRegister", requestData);
      console.log(data);
    },
  },
});

export const { setData, setEducationList, setQualificationList, sendData } =
  professionalRegisterSlice.actions;

export default professionalRegisterSlice.reducer;
