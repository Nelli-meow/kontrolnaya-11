import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItems, ItemMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getItems = createAsyncThunk<IItems[], void>(
  'items/getItems',
  async () => {
    const response = await axiosApi<IItems[]>('/items');
    return response.data;
  }
);

export const addItem = createAsyncThunk<void, { item: ItemMutation, token: string }>(
  'items/addItem',
  async ({ item, token }) => {
    const formData = new FormData();

    const keys = Object.keys(item) as (keyof ItemMutation)[];

    keys.forEach((key) => {
      const value = item[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/items', formData, { headers: { 'Authorization': token } });
  }
);
