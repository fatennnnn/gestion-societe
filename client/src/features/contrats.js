import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContratUserId = createAsyncThunk(
  "contrat/usercontrat-id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/facture/contrat/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addContrat = createAsyncThunk(
  "facture/create-contrat",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/facture/create-contrat", formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteContrat = createAsyncThunk(
  "facture/delete-Contrat",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/facture/delete-Contrat", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const contrats = createSlice({
  name: "contrat",
  initialState: {
    contrat: null,
    contratErrors: { create: null, delete: null, getAll: null },
    contratStatus: { create: "idle", delete: "idle", getAll: "idle" },
  },
  reducers: {},
  extraReducers: {
    [getContratUserId.pending]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, getAll: "loading" },
      };
    },
    [getContratUserId.fulfilled]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, getAll: "succeded" },
        contratErrors: { ...state.contratErrors, getAll: null },
        contrat: action.payload,
      };
    },
    [getContratUserId.rejected]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, getAll: "failed" },
        contratErrors: {
          ...state.contratErrors,
          getAll: action.payload,
        },
      };
    },
    [addContrat.pending]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, create: "loading" },
      };
    },
    [addContrat.fulfilled]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, create: "succeded" },
        contratErrors: { ...state.contratErrors, create: null },
        contrat: action.payload,
      };
    },
    [addContrat.rejected]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, create: "failed" },
        contratErrors: {
          ...state.contratErrors,
          create: action.payload,
        },
      };
    },
    [deleteContrat.pending]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, delete: "loading" },
      };
    },
    [deleteContrat.fulfilled]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, delete: "succeded" },
        contratErrors: { ...state.contratErrors, delete: null },
        contrat: action.payload,
      };
    },
    [deleteContrat.rejected]: (state, action) => {
      return {
        ...state,
        contratStatus: { ...state.contratStatus, delete: "loading" },
        contratErrors: {
          ...state.contratErrors,
          delete: action.payload,
        },
      };
    },
  },
});
export default contrats.reducer;
