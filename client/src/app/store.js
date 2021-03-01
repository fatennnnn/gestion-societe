import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import adminReducer from "../features/adminSlice";
import facturesReducer from "../features/factures";
import adminWorkerReducer from "../features/adminWorker";
import bonCommandesReducer from "../features/bonCommandes";
import contratsReducer from "../features/contrats";
import fichedePaiesReducer from "../features/fichedePaies";

export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    // serializableCheck: {
    //   // Ignore these action types
    //   ignoredActions: ["fficheDePaie/download"],
    //   // Ignore these field paths in all actions
    //   ignoredActionPaths: ["meta.arg", "payload.timestamp"],
    //   // Ignore these paths in the state
    //   ignoredPaths: ["items.dates"],
    // },
  }),
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    factures: facturesReducer,
    adminWorker: adminWorkerReducer,
    bonCommandes: bonCommandesReducer,
    contrats: contratsReducer,
    fichedePaies: fichedePaiesReducer,
  },
});
