import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createClient = createAsyncThunk(
  "user/sign-up",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/sign-up", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const signUp = createSlice({
  name: "client",
  initialState: {
    client: null,
  },
});
