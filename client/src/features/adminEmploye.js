import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const createInformationWorker = createAsyncThunk(
  "worker/createInformation-worker",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/employe/information-employe", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const adminEmploye = createSlice({
  name: "employe",
  initialState: {
    employe: null,
    adminStatus: { create: "idle" },

    adminErrors: {
      create: null,
    },
  },
  reducers: {
    initErrors(state) {
      return {
        ...state,
        adminErrors: { create: null },
      };
    },
  },
  extraReducers: {
    [createInformationWorker.pending]: (state, action) => {
      return {
        ...state,
        adminStatus: { ...state.adminStatus, create: "loading" },
      };
    },
    [createInformationWorker.fulfilled]: (state, action) => {
      return {
        ...state,
        employe: action.payload,
        adminStatus: { ...state.adminStatus, create: "succeded" },
        adminErrors: { ...state.adminErrors, create: null },
      };
    },
    [createInformationWorker.rejected]: (state, action) => {
      return {
        ...state,
        adminStatus: { ...state.adminStatus, create: "failed" },
        adminErrors: { ...state.adminErrors, create: action.payload },
      };
    },
  },
});
export const { initErrors } = adminEmploye.actions;
export default adminEmploye.reducer;
