import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "users/allusers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/list-user", data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const adminSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
    adminStatus: { getAll: "idle" },
    adminErrors: {
      getAll: null,
    },
  },
  reducers: {
    initErrors(state) {
      return {
        ...state,
        adminErrors: { getAll: null },
      };
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      return {
        ...state,
        adminStatus: { ...state.adminStatus, getAll: "loading" },
      };
    },
    [getAllUsers.fulfilled]: (state, action) => {
      return {
        ...state,
        users: action.payload,
        adminStatus: { ...state.adminStatus, getAll: "succeded" },
        adminErrors: { ...state.adminErrors, getAll: null },
      };
    },
    [getAllUsers.rejected]: (state, action) => {
      return {
        ...state,
        adminStatus: { ...state.adminStatus, getAll: "failed" },
        adminErrors: { ...state.adminErrors, getAll: action.payload },
      };
    },
  },
});
export const { initErrors } = adminSlice.actions;
export default adminSlice.reducer;
