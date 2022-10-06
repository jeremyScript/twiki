import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import { RootState } from "./store";

export type CellType = "code" | "text";

export interface CellProps {
  ratio?: number;
  height?: number;
  locked: boolean;
}

export interface Cell {
  id: string;
  type: CellType;
  content: string;
  props: CellProps;
}

export interface DocumentState {
  did: string;
  title: string;
  order: string[];
  data: {
    [id: string]: Cell;
  };
  timestamp?: Timestamp;
  pending: boolean;
  success: string | null;
  error: string | null;
}

const initialState: DocumentState = {
  did: "",
  title: "",
  order: [],
  data: {},
  pending: false,
  success: null,
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
          props: {
            ratio: 0.5,
            height: 300,
            locked: false,
          },
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
    updateCellProps(
      state,
      action: PayloadAction<{
        id: string;
        ratio?: number;
        height?: number;
        locked?: boolean;
      }>
    ) {
      const { id, ratio, height, locked } = action.payload;
      if (ratio) state.data[id].props.ratio = ratio;
      if (height) state.data[id].props.height = height;
      if (locked) state.data[id].props.locked = locked;
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
    clearDocument(state) {
      return initialState;
    },
    updateDocument(
      state,
      action: PayloadAction<{
        did?: string;
        title?: string;
        order?: string[];
        data?: { [id: string]: Cell };
      }>
    ) {
      const { did, title, order, data } = action.payload;
      state.did = did === undefined ? state.did : did;
      state.title = title === undefined ? state.title : title;
      state.order = order || state.order;
      state.data = data || state.data;
    },
    isPending(state) {
      state.pending = true;
      state.success = null;
      state.error = null;
    },
    isSuccessful(state, action: PayloadAction<string>) {
      state.pending = false;
      state.error = null;
      state.success = action.payload;
    },
    hasError(state, action: PayloadAction<string>) {
      state.pending = false;
      state.error = action.payload;
      state.success = null;
    },
  },
});

export default documentSlice.reducer;

export const {
  insertCellAfter,
  updateCell,
  updateCellProps,
  moveCell,
  deleteCell,
  clearDocument,
  updateDocument,
  isPending,
  isSuccessful,
  hasError,
} = documentSlice.actions;

export const selectIds = (state: RootState) => state.document.order;
export const selectCells = (state: RootState) => state.document.data;
export const selectOrderedCells = createSelector(
  [selectIds, selectCells],
  (ids, cells) => ids.map((id) => cells[id])
);
