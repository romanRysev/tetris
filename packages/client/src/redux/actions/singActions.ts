import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginForm } from '../../pages/Login/Login';
import { RegisterForm } from '../../pages/Register/Register';
import { getProfileRequest, postLoginRequest, postLogout, postRegisterRequest } from '../../utils/api';

export const register = createAsyncThunk('auth/register', async (data: RegisterForm, thunkAPI) => {
  try {
    const res = await postRegisterRequest(data);
    if (res.ok) {
      return thunkAPI.fulfillWithValue(res);
    }
    const err = await res.json();
    throw new Error(err.reason);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const login = createAsyncThunk('auth/login', async (data: LoginForm, thunkAPI) => {
  try {
    const res = await postLoginRequest(data);
    if (res.ok) {
      return thunkAPI.fulfillWithValue(res);
    }
    const err = await res.json();
    throw new Error(err.reason);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const checkLogin = createAsyncThunk('auth/checkLogin', async (data, thunkAPI) => {
  try {
    const res = await getProfileRequest();
    if (res.ok) {
      return thunkAPI.fulfillWithValue(await res.json());
    }
    const err = await res.json();
    throw new Error(err.reason);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const logout = createAsyncThunk('auth/logout', async (data, thunkAPI) => {
  try {
    const res = await postLogout();
    if (res.ok) {
      return thunkAPI.fulfillWithValue(true);
    }
    throw new Error('Не разлогинить пользователя');
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
