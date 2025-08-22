import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ActiveColumnType = 'left' | 'center' | 'right';

interface ColumnState {
  activeColumn: ActiveColumnType;
}

const initialState: ColumnState = {
  activeColumn: 'left',
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setActiveColumn(state, action: PayloadAction<ActiveColumnType>) {
      state.activeColumn = action.payload;
    },
  },
});

export const { setActiveColumn } = columnSlice.actions;
export const columnReducer = columnSlice.reducer;
