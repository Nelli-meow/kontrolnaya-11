import { IItems } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { getItems } from './itemsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ItemsState {
  items: IItems[];
  itemsLoading: boolean;
  itemsError: boolean;
}

const initialState: ItemsState = {
  items: [],
  itemsError: false,
  itemsLoading: false,
}

export const selectItems = (state: RootState) => state.items.items;

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
    builder
      .addCase(getItems.pending, (state) => {
        state.itemsLoading = true;
        state.itemsError = false;
      })
      .addCase(getItems.fulfilled, (state, {payload: items}) => {
        state.itemsLoading = false;
        state.itemsError = false;
        state.items = items;
      })
      .addCase(getItems.rejected, (state) => {
        state.itemsLoading = false;
        state.itemsError = true;
      })
  }
});

export const itemsReducer = itemsSlice.reducer;