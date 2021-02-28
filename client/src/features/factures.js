import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFactureUserId = createAsyncThunk(
  "facture/user-id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/facture/allFactUser/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addFacture = createAsyncThunk(
  "facture/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/facture/create-facture", formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteFacture = createAsyncThunk(
  "facture/delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/facture/delete-facture", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const factures = createSlice({
  name: "facture",
  initialState: {
    facture: null,
    factureErrors: { create: null, delete: null, getFactId: null },
    factureStatus: { create: "idle", delete: "idle", getFactId: "idle" },
    // pages: null,
  },
  reducers: {},
  extraReducers: {
    [getFactureUserId.pending]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, getFactId: "loading" },
      };
    },
    [getFactureUserId.fulfilled]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, getFactId: "succeded" },
        factureErrors: { ...state.factureErrors, getFactId: null },
        facture: action.payload,
      };
    },
    [getFactureUserId.rejected]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, getFactId: "failed" },
        factureErrors: { ...state.factureErrors, getFactId: action.payload },
      };
    },
    [addFacture.pending]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, create: "loading" },
      };
    },
    [addFacture.fulfilled]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, create: "succeded" },
        factureErrors: { ...state.factureErrors, create: null },
        facture: action.payload,
      };
    },
    [addFacture.rejected]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, create: "failed" },
        factureErrors: { ...state.factureErrors, create: action.payload },
      };
    },
    [deleteFacture.pending]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, delete: "loading" },
      };
    },
    [deleteFacture.fulfilled]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, delete: "succeded" },
        factureErrors: { ...state.factureErrors, delete: null },
        facture: action.payload,
      };
    },
    [deleteFacture.rejected]: (state, action) => {
      return {
        ...state,
        factureStatus: { ...state.factureStatus, delete: "failed" },
        factureErrors: { ...state.factureErrors, delete: action.payload },
      };
    },
  },
});
export default factures.reducer;
