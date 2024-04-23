import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../API/config";

const initialState = {
  professionalReviews: null,
  employerReviews: null,
};
export const asyncProfessionalDataReviews = createAsyncThunk(
  "/professionalReviews",
  async () => {
    const data = await getRequest("getAllProfessionalRequests");
    if (data) {
      return data.data;
    }
    throw new Error("No data!");
  }
);

export const asyncProfessionalReviewOperation = createAsyncThunk(
  "/professionalAccept",
  async (reviewData, thunkAPI) => {
    console.log(reviewData);
    const data = await postRequest("professionalRequestReview", reviewData);
    console.log(data.data);
    if (data) {
      return data.data;
    }
  }
);
export const staffSlice = createSlice({
  name: "staffStates",
  initialState,
  reducers: {
    setReviewData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncProfessionalDataReviews.fulfilled, (state, action) => {
        state.professionalReviews = action.payload;
        return state;
      })
      .addCase(asyncProfessionalDataReviews.rejected, (state, action) => {
        state.professionalReviews = [];
        return state;
      });
  },
});

export const { setReviewData } = staffSlice;

export default staffSlice.reducer;
