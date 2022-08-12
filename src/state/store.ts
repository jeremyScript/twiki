import { configureStore } from "@reduxjs/toolkit";

import documentReducer from "./documentSlice";
import bundlesReducer from "./bundlesSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    document: documentReducer,
    bundles: bundlesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
