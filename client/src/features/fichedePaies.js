import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFicheDePaie = createAsyncThunk(
  "fficheDePaie/employé-id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/ficheDePaie/allFichUser/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addFicheDePaie = createAsyncThunk(
  "ficheDePaie/create-fichedepaie",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/ficheDePaie/create-fichedepaie",
        formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteFicheDePaie = createAsyncThunk(
  "ficheDePaie/delete-fiche",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/ficheDePaie/delete-fiche", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const fichedePaies = createSlice({
  name: "fichedePaie",
  initialState: {
    fichedePaie: null,
    fichedePaieErrors: { create: null, delete: null, getAll: null },
    fichedePaieStatus: { create: "idle", delete: "idle", getAll: "idle" },
  },
  reducers: {},
  extraReducers: {
    [getFicheDePaie.pending]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, getAll: "loading" },
      };
    },
    [getFicheDePaie.fulfilled]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, getAll: "succeded" },
        fichedePaieErrors: { ...state.fichedePaieErrors, getAll: null },
        fichedePaie: action.payload,
      };
    },
    [getFicheDePaie.rejected]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, getAll: "failed" },
        fichedePaieErrors: {
          ...state.fichedePaieErrors,
          getAll: action.payload,
        },
      };
    },
    [addFicheDePaie.pending]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, create: "loading" },
      };
    },
    [addFicheDePaie.fulfilled]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, create: "succeded" },
        fichedePaieErrors: { ...state.fichedePaieErrors, create: null },
        fichedePaie: action.payload,
      };
    },
    [addFicheDePaie.rejected]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, create: "failed" },
        fichedePaieErrors: {
          ...state.fichedePaieErrors,
          create: action.payload,
        },
      };
    },
    [deleteFicheDePaie.pending]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, delete: "loading" },
      };
    },
    [deleteFicheDePaie.fulfilled]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, delete: "succeded" },
        fichedePaieErrors: { ...state.fichedePaieErrors, delete: null },
        fichedePaie: action.payload,
      };
    },
    [deleteFicheDePaie.rejected]: (state, action) => {
      return {
        ...state,
        fichedePaieStatus: { ...state.fichedePaieStatus, delete: "loading" },
        fichedePaieErrors: {
          ...state.fichedePaieErrors,
          delete: action.payload,
        },
      };
    },
  },
});
export default fichedePaies.reducer;
