import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItems } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getItems = createAsyncThunk<IItems[], void>(
  'items/getItems',
  async () => {
    const response = await axiosApi<IItems[]>('/items');
    return response.data;
  }
);