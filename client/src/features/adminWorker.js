import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { create } from "../../../models/User";

export const createWorker = createAsyncThunk(
  "worker/create-worker",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/worker/create-worker", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getAllWorkers = createAsyncThunk(
  "worker/getAllWorkers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/worker/list-worker", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteWorker = createAsyncThunk(
  "/worker/deleteWorker",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/worker/del-worker", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const adminWorker = createSlice({
  name: "worker",
  initialState: {
    worker: "",
    workers: null,
    workerStatut: {
      create: "idle",
      delete: "idle",
      getAll: "idle",
    },
    workerErrors: {
      create: null,
      delete: null,
      getAll: null,
    },
  },
  reducers: {
    initErrors(state) {
      return {
        ...state,
        workerErrors: { create: null, delete: null, getAll: null },
      };
    },
  },
  extraReducers: {
    [createWorker.pending]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, create: "loading" },
      };
    },
    [createWorker.fulfilled]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, create: "succeded" },
        workerErrors: { ...state.workerErrors, create: null },
        worker: action.payload,
      };
    },
    [createWorker.rejected]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, create: "failed" },
        workerErrors: { ...state.workerErrors, create: action.payload },
      };
    },

    [getAllWorkers.pending]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, getAll: "loading" },
      };
    },
    [getAllWorkers.fulfilled]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, getAll: "succeded" },
        workerErrors: { ...state.workerErrors, getAll: null },
        workers: action.payload,
      };
    },
    [getAllWorkers.rejected]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, getAll: "failed" },
        workerErrors: { ...state.workerErrors, getAll: action.payload },
      };
    },
    [deleteWorker.pending]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, delete: "loading" },
      };
    },
    [deleteWorker.fulfilled]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, delete: "succeded" },
        workerErrors: { ...state.workerErrors, delete: null },
        worker: action.payload,
      };
    },
    [deleteWorker.rejected]: (state, action) => {
      return {
        ...state,
        workerStatut: { ...state.workerStatut, delete: "failed" },
        workerErrors: { ...state.workerErrors, delete: action.payload },
      };
    },
  },
});
export const { initErrors } = adminWorker.actions;
export default adminWorker.reducer;
