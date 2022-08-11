import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import bundle from "../bundler";

export interface BundlesState {
  [key: string]:
    | {
        bundling: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(bundleStarted(cellId));

    const result = await bundle(input);
    dispatch(
      bundleFinished({
        id: cellId,
        code: result.code,
        error: result.bundleStatus,
      })
    );
  };
};

const bundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    bundleStarted(state, action: PayloadAction<string>) {
      const id = action.payload;
      state[id] = {
        bundling: true,
        code: "",
        error: "",
      };
    },
    bundleFinished(
      state,
      action: PayloadAction<{ id: string; code: string; error: string }>
    ) {
      const { id, code, error } = action.payload;
      state[id] = {
        bundling: false,
        code: code,
        error: error,
      };
    },
    clearBundles(state) {
      return {};
    },
  },
});

export default bundlesSlice.reducer;

export const { bundleStarted, bundleFinished, clearBundles } =
  bundlesSlice.actions;
