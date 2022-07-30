import { configureStore } from "@reduxjs/toolkit";

import cellsReducer from "./cellsSlice";

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
