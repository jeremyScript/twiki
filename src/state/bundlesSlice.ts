import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BundlesState {
  [key: string]: {
    status: boolean;
    code: string;
    error: string | null;
  };
}

const initialState: BundlesState = {};

const bundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    bundleStarted(state, action: PayloadAction<{}>) {},
    bundleFinished(state, action: PayloadAction<{}>) {},
  },
});

export default bundlesSlice.reducer;
