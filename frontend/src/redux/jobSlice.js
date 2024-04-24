import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../API/config";

const initialState = {
  jobs: null,
};

export const getAllJobs = createAsyncThunk("jobAllJobs", async (id) => {
  if (id) {
    const data = await getRequest("getAllJobsForAEmployer" + "/" + id);
    if (data && data.data) {
      return data.data;
    }
  } else {
    const data = await getRequest("getJobs");
    if (data && data.data) {
      return data.data;
    }
  }

  throw new Error("No Data!");
});
export const jobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, jobs: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        return state;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.jobs = [];
        return state;
      });
  },
});
export const { setData } = jobSlice.actions;

export default jobSlice.reducer;

//checking for the token and decoding the token
