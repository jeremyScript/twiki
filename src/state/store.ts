import { configureStore } from "@reduxjs/toolkit";

import cellsReducer from "./cellsSlice";
import bundlesReducer from "./bundlesSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
