import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export type CellType = "code" | "text";

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}

export interface DocumentState {
  did: string;
  title: string;
  order: string[];
  data: {
    [id: string]: Cell;
  };
  pending: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  did: "",
  title: "",
  order: [],
  data: {},
  pending: false,
  error: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    insertCellAfter: {
      reducer(
        state,
        action: PayloadAction<{
          id: string;
          type: CellType;
          prevCellId?: string;
        }>
      ) {
        const { id, type, prevCellId } = action.payload;
        const cell: Cell = {
          id,
          type,
          content: "",
        };
        state.data[id] = cell;
        const index = prevCellId ? state.order.indexOf(prevCellId) + 1 : 0;
        state.order.splice(index, 0, id);
      },
      prepare(type, prevCellId) {
        return {
          payload: {
            id: nanoid(),
            type,
            prevCellId,
          },
        };
      },
    },
    updateCell(state, action: PayloadAction<{ id: string; content: string }>) {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    moveCell(
      state,
      action: PayloadAction<{ id: string; direction: "up" | "down" }>
    ) {
      const { id, direction } = action.payload;
      const { order } = state;
      const index = order.indexOf(id);
      if (direction === "up") {
        if (index === 0) return state;
        [order[index], order[index - 1]] = [order[index - 1], order[index]];
      } else {
        if (index === order.length - 1) return state;
        [order[index], order[index + 1]] = [order[index + 1], order[index]];
      }
    },
    deleteCell(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.order = state.order.filter((cellId) => cellId !== id);
      delete state.data[id];
    },
    clearCells(state) {
      state.order = [];
      state.data = {};
    },
    updateTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    saveDocInitiated(state) {
      state.pending = true;
      state.error = null;
    },
    saveDocFinished(state, action: PayloadAction<string>) {
      state.did = action.payload;
      state.pending = false;
      state.error = null;
    },
    saveDocError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    fetchDocInitiated(state, action: PayloadAction<string>) {},
  },
});

export default documentSlice.reducer;

export const {
  insertCellAfter,
  updateCell,
  moveCell,
  deleteCell,
  clearCells,
  updateTitle,
  saveDocInitiated,
  saveDocFinished,
  saveDocError,
} = documentSlice.actions;

export const selectIds = (state: RootState) => state.document.order;
export const selectCells = (state: RootState) => state.document.data;
export const selectOrderedCells = createSelector(
  [selectIds, selectCells],
  (ids, cells) => ids.map((id) => cells[id])
);

export const saveDoc = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(saveDocInitiated());
    let {
      document: { did, title, order, data },
      user: { currentUser: uid },
    } = getState();

    did = did || nanoid();

    try {
      await setDoc(doc(db, "documents", did), {
        uid,
        did,
        title,
        order,
        data,
        timestamp: serverTimestamp(),
      });
      dispatch(saveDocFinished(did));
    } catch (err: any) {
      dispatch(saveDocError(err.message));
    }
  };
};
