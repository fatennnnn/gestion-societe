import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBonCommandeUserId = createAsyncThunk(
  "bonCommande/user-id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/facture/allCommandeUser/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addBonCommande = createAsyncThunk(
  "facture/create-boncommande",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/facture/create-boncommande",
        formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteBonCommande = createAsyncThunk(
  "facture/delete-bonCommande",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/facture/delete-bonCommande", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const bonCommandes = createSlice({
  name: "bonCommande",
  initialState: {
    bonCommande: null,
    bonCommandeErrors: { create: null, delete: null, getAll: null },
    bonCommandeStatus: { create: "idle", delete: "idle", getAll: "idle" },
  },
  reducers: {},
  extraReducers: {
    [getBonCommandeUserId.pending]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, getAll: "loading" },
      };
    },
    [getBonCommandeUserId.fulfilled]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, getAll: "succeded" },
        bonCommandeErrors: { ...state.bonCommandeErrors, getAll: null },
        bonCommande: action.payload,
      };
    },
    [getBonCommandeUserId.rejected]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, getAll: "failed" },
        bonCommandeErrors: {
          ...state.bonCommandeErrors,
          getAll: action.payload,
        },
      };
    },
    [addBonCommande.pending]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, create: "loading" },
      };
    },
    [addBonCommande.fulfilled]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, create: "succeded" },
        bonCommandeErrors: { ...state.bonCommandeErrors, create: null },
        bonCommande: action.payload,
      };
    },
    [addBonCommande.rejected]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, create: "failed" },
        bonCommandeErrors: {
          ...state.bonCommandeErrors,
          create: action.payload,
        },
      };
    },
    [deleteBonCommande.pending]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, delete: "loading" },
      };
    },
    [deleteBonCommande.fulfilled]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, delete: "succeded" },
        bonCommandeErrors: { ...state.bonCommandeErrors, delete: null },
        bonCommande: action.payload,
      };
    },
    [deleteBonCommande.rejected]: (state, action) => {
      return {
        ...state,
        bonCommandeStatus: { ...state.bonCommandeStatus, delete: "loading" },
        bonCommandeErrors: {
          ...state.bonCommandeErrors,
          delete: action.payload,
        },
      };
    },
  },
});
export default bonCommandes.reducer;
