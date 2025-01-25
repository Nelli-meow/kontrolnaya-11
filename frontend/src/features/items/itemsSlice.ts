import { IItems } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addItem, getItems, getOneItem } from './itemsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ItemsState {
  items: IItems[];
  item: IItems | null;
  itemsLoading: boolean;
  error: boolean;
  addItemError: boolean;
  addError: boolean;
  addItemLoading: boolean;
  getOneItemLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  item: null,
  error: false,
  itemsLoading: false,
  addError: false,
  addItemLoading: false,
  addItemError: false,
  getOneItemLoading: false,
}

export const selectItems = (state: RootState) => state.items.items;
export const selectOneItem = (state: RootState) => state.items.item;

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
    builder
      .addCase(getItems.pending, (state) => {
        state.itemsLoading = true;
        state.error = false;
      })
      .addCase(getItems.fulfilled, (state, {payload: items}) => {
        state.itemsLoading = false;
        state.error = false;
        state.items = items;
      })
      .addCase(getItems.rejected, (state) => {
        state.itemsLoading = false;
        state.error = true;
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
      })

      .addCase(getOneItem.pending, (state) => {
        state.getOneItemLoading = true;
        state.error = false;
      })
      .addCase(getOneItem.fulfilled, (state, {payload: item}) => {
        state.item = item;
        state.getOneItemLoading = false;
        state.error = false;
      })
      .addCase(getOneItem.rejected, (state) => {
        state.getOneItemLoading = false;
        state.error = true;
      });


  }
});

export const itemsReducer = itemsSlice.reducer;