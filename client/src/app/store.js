import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import adminReducer from "../features/adminSlice";
import facturesReducer from "../features/factures";
import adminWorkerReducer from "../features/adminWorker";
import bonCommandesReducer from "../features/bonCommandes";
import contratsReducer from "../features/contrats";
import fichedePaiesReducer from "../features/fichedePaies";

export default configureStore({
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
