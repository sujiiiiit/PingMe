import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchIsOpen: boolean;
  searchContent: string;
}

const initialState: SearchState = {
  searchIsOpen: false,
  searchContent: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    openSearch(state) {
      state.searchIsOpen = true;
    },
    closeSearch(state) {
      state.searchIsOpen = false;
    },
    setSearchContent(state, action: PayloadAction<string>) {
      state.searchContent = action.payload;
    },
    clearSearchContent(state) {
      state.searchContent = '';
    },
  },
});

export const { openSearch, closeSearch, setSearchContent, clearSearchContent } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
