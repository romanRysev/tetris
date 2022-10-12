import { createAsyncThunk } from '@reduxjs/toolkit';
import { postLoginRequest } from '../../utils/api';

export const fetchUser = createAsyncThunk('user/fetch', async (_, thunkAPI) => {
  try {
    return postLoginRequest.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователя');
  }
});
