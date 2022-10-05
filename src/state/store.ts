import { configureStore } from "@reduxjs/toolkit";

import documentReducer from "./documentSlice";
import bundlesReducer from "./bundlesSlice";
import userReducer from "./userSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    document: documentReducer,
    bundles: bundlesReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
