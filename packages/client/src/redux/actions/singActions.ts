import { createAsyncThunk } from '@reduxjs/toolkit';
import { postLoginRequest, postLogout } from '../../utils/api';

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    return await postLoginRequest(data).then((response) => response.json());
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователя');
  }
});

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    return await postLoginRequest(data).then((response) => response.json());
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователя');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await postLogout;
});
