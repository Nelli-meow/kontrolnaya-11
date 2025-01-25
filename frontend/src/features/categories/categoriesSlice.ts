import { ICategories } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './categoriesThunk.ts';
import { RootState } from '../../app/store.ts';

interface categoriesState {
  categories: ICategories[];
  loading: boolean;
  error: boolean;
}

const initialState: categoriesState = {
  categories: [],
  loading: false,
  error: false,
}

export const selectCategory = (state: RootState) => state.categories.categories;

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCategories.fulfilled, (state, {payload: categories}) => {
        state.loading = false;
        state.error = false;
        state.categories = categories;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export const categoriesReducer = categoriesSlice.reducer;