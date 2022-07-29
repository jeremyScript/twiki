import { createSlice, nanoid } from "@reduxjs/toolkit";

export interface Cell {
  id: string;
  type: "code" | "text";
  content: string;
}

export interface CellsState {
  status: string;
  ids: string[];
  data: {
    [id: string]: Cell;
  };
  error: string | null;
}

const initialState: CellsState = {
  status: "idle",
  ids: [],
  data: {},
  error: null,
};

const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    insertCellAfter(state, action) {
      const [type, prevCellId] = action.payload;
      const id = nanoid();
      const cell: Cell = {
        id,
        type,
        content: "",
      };
      state.data[id] = cell;

      const index = state.ids.findIndex(prevCellId);
      state.ids.splice(index, 0, id);
    },
    updateCell(state, action) {},
    moveCell(state, action) {},
    deleteCell(state, action) {},
  },
});

export default cellsSlice.reducer;

export const { insertCellAfter, updateCell, moveCell, deleteCell } =
  cellsSlice.actions;
