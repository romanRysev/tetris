import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginForm } from '../../pages/Login/Login';
import { RegisterForm } from '../../pages/Register/Register';
import { getProfileRequest, postLoginRequest, postLogout, postRegisterRequest } from '../../utils/api';

export const register = createAsyncThunk('auth/register', async (data: RegisterForm, thunkAPI) => {
  try {
    await postRegisterRequest(data);
    const profileRes = await getProfileRequest();
    return thunkAPI.fulfillWithValue(profileRes);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const login = createAsyncThunk('auth/login', async (data: LoginForm, thunkAPI) => {
  try {
    await postLoginRequest(data);
    const profileRes = await getProfileRequest();
    return thunkAPI.fulfillWithValue(profileRes);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const checkLogin = createAsyncThunk('auth/checkLogin', async (data, thunkAPI) => {
  try {
    const res = await getProfileRequest();
    return thunkAPI.fulfillWithValue(res);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const logout = createAsyncThunk('auth/logout', async (data, thunkAPI) => {
  try {
    await postLogout();
    localStorage.clear();
    return thunkAPI.fulfillWithValue(true);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
