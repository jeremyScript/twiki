import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type CellType = "code" | "text";

export interface Cell {
  id: string;
  type: CellType;
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
    insertCellAfter(
      state,
      action: PayloadAction<{ type: CellType; prevCellId?: string }>
    ) {
      const { type, prevCellId } = action.payload;
      const id = nanoid();
      const cell: Cell = {
        id,
        type,
        content: "",
      };
      state.data[id] = cell;
      const index = prevCellId ? state.ids.indexOf(prevCellId) + 1 : 0;
      state.ids.splice(index, 0, id);
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
      const { ids } = state;
      const index = ids.indexOf(id);
      if (direction === "up") {
        if (index === 0) return state;
        [ids[index], ids[index - 1]] = [ids[index - 1], ids[index]];
      } else {
        if (index === ids.length - 1) return state;
        [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
      }
    },
    deleteCell(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.ids = state.ids.filter((cellId) => cellId !== id);
      delete state.data[id];
    },
  },
});

export default cellsSlice.reducer;

export const { insertCellAfter, updateCell, moveCell, deleteCell } =
  cellsSlice.actions;
