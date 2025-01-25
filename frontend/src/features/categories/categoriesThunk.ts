import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategories } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getCategories = createAsyncThunk<ICategories[], void>(
  'categories/getCategories',
  async () => {
    const response = await axiosApi<ICategories[]>('/categories');
    return response.data;
  }
);