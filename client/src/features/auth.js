import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const { email, motdepasse } = data;
      const response = await axios.post("/auth/connection", data);
      if (response.data.role === "admin") {
        data.history.push("/admin-section");
      } else if (response.data.role === "user") {
        data.history.push("/user-section");
      } else if (response.data.role === "worker") {
        data.history.push("/worker-section");
      } else {
        data.history.push("/");
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
///sign-up CLIENT
export const createClient = createAsyncThunk(
  "user/sign-up",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/sign-up", data);

      data.history.push("/user-section");

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    status: "idle",
    errors: null,
    user: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, user: null };
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      return {
        ...state,
        status: "loading",
      };
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        status: "succeded",
        errors: null,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    [login.rejected]: (state, action) => {
      return {
        ...state,
        status: "failed",
        errors: action.payload,
      };
    },
    [createClient.pending]: (state, action) => {
      return {
        ...state,
        status: "loading",
      };
    },
    [createClient.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        status: "succeded",
        errors: null,
        user: action.payload,
        isAuthenticated: true,
      };
    },
    [createClient.rejected]: (state, action) => {
      return {
        ...state,
        status: "failed",
        errors: action.payload,
      };
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
