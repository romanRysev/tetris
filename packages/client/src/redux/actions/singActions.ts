import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileRequest, postLoginRequest, postLogout, postRegisterRequest } from '../../utils/api';

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    return await postRegisterRequest(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователя');
  }
});

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    return await postLoginRequest(data);
  } catch (e) {
    console.log(e);

    return thunkAPI.rejectWithValue('Не удалось загрузить пользователя');
  }
});

export const checkLogin = createAsyncThunk('auth/checkLogin', async (data, thunkAPI) => {
  try {
    const res = await getProfileRequest();
    const user = await res.json();

    return thunkAPI.fulfillWithValue(user);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить данные пользователя');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await postLogout;
});
