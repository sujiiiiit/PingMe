
import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './slices/searchSlice';
import { columnReducer } from './slices/columnSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    column: columnReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
