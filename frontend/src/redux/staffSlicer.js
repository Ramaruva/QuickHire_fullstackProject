import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../API/config";

const initialState = {
  professionalReviews: [],
  employerReviews: [],
  professionalDetails: [],
  employerDetails: [],
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

export const asyncEmployerDataReviews = createAsyncThunk(
  "/employerReviews",
  async () => {
    const data = await getRequest("getAllEmployerRequests");
    if (data) {
      return data.data;
    }
    throw new Error("No data!");
  }
);

export const asyncProfessionalDetails = createAsyncThunk(
  "/employerDetails",
  async () => {
    const data = await getRequest("getProfessional");
    if (data && data.data) {
      console.log(data.data);
      return data.data;
    }
    throw new Error("No data!");
  }
);

export const asyncEmployerDetails = createAsyncThunk(
  "/professionalDetails",
  async () => {
    const data = await getRequest("getEmployers");
    if (data && data.data) {
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

export const asyncEmployerReviewOperation = createAsyncThunk(
  "/employerRequest",
  async (reviewData, thunkAPI) => {
    const data = await postRequest("employerRequestReview", reviewData);
    if (data) {
      return data.data;
    }
  }
);
export const asyncProfessionalDeleteReviews = createAsyncThunk(
  "/deleterequests",
  async () => {
    const data = await getRequest("getAllProfessionalDeleteRequests");
    if (data) {
      return data.data;
    }
    throw new Error("No Data!");
  }
);

export const asyncEmployerDeleteReviews = createAsyncThunk(
  "/empdeleterequets",
  async () => {
    const data = await getRequest("getAllEmployerDeleteRequests");
    if (data) {
      return data.data;
    }
    throw new Error("No Data!");
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
      })
      .addCase(asyncEmployerDataReviews.fulfilled, (state, action) => {
        state.employerReviews = action.payload;
        return state;
      })
      .addCase(asyncEmployerDataReviews.rejected, (state, action) => {
        state.employerReviews = [];
        return state;
      })
      .addCase(asyncProfessionalDetails.fulfilled, (state, action) => {
        state.professionalDetails = action.payload;
        console.log(state, action.payload);
        return state;
      })
      .addCase(asyncProfessionalDetails.rejected, (state, action) => {
        state.professionalDetails = [];
        return state;
      })
      .addCase(asyncEmployerDetails.fulfilled, (state, action) => {
        state.employerDetails = action.payload;
        return state;
      })
      .addCase(asyncEmployerDetails.rejected, (state, action) => {
        state.employerDetails = [];
        return state;
      })
      .addCase(asyncProfessionalDeleteReviews.fulfilled, (state, action) => {
        state.professionalReviews = action.payload;
        return state;
      })
      .addCase(asyncProfessionalDeleteReviews.rejected, (state, action) => {
        state.professionalReviews = [];
        return state;
      })
      .addCase(asyncEmployerDeleteReviews.fulfilled, (state, action) => {
        state.employerReviews = action.payload;
        return state;
      })
      .addCase(asyncEmployerDeleteReviews.rejected, (state, action) => {
        state.employerReviews = [];
        return state;
      });
  },
});

export const { setReviewData } = staffSlice;

export default staffSlice.reducer;
