import { IItems } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addItem, getItems } from './itemsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ItemsState {
  items: IItems[];
  // item: IItems | null;
  itemsLoading: boolean;
  itemsError: boolean;
  addItemError: boolean;
  addError: boolean;
  addItemLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  itemsError: false,
  itemsLoading: false,
  addError: false,
  addItemLoading: false,
  addItemError: false,
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

      .addCase(addItem.pending, (state) => {
        state.addItemLoading = true;
        state.addItemError = false;
      })
      .addCase(addItem.fulfilled, (state) => {
        state.addItemLoading = false;
        state.addItemError = false;
      })
      .addCase(addItem.rejected, (state) => {
        state.addItemLoading = false;
        state.addItemError = true;
      });
  }
});

export const itemsReducer = itemsSlice.reducer;