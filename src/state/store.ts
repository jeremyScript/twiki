import { configureStore } from "@reduxjs/toolkit";

import cellsReducer from "./cellsSlice";
import bundlesReducer from "./bundlesSlice";

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
