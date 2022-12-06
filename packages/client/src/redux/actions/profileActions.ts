import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IChangeInfo,
  IChangePassword,
  setAvatarRequest,
  setProfileInfoRequest,
  setProfilePasswordRequest,
} from '../../utils/api';

export const setAvatar = createAsyncThunk('auth/user/avatar', async (data: FormData, thunkAPI) => {
  try {
    const user = await setAvatarRequest(data);
    return thunkAPI.fulfillWithValue({ ...user });
  } catch (e) {
    if ((e as Record<string, string>).reason?.includes('not valid')) {
      return thunkAPI.rejectWithValue('unauthorized');
    }
    return thunkAPI.rejectWithValue('Не удалось загрузить аватар');
  }
});

export const setProfileInfo = createAsyncThunk('auth/user', async (data: IChangeInfo, thunkAPI) => {
  try {
    const user = await setProfileInfoRequest(data);
    return thunkAPI.fulfillWithValue({ ...user });
  } catch (e) {
    if ((e as Record<string, string>).reason?.includes('not valid')) {
      return thunkAPI.rejectWithValue('unauthorized');
    }
    return thunkAPI.rejectWithValue('Не удалось обновить данные');
  }
});

export const setProfilePassword = createAsyncThunk('auth/user/password', async (data: IChangePassword, thunkAPI) => {
  try {
    await setProfilePasswordRequest(data);
    return thunkAPI.fulfillWithValue({});
  } catch (e) {
    if ((e as Record<string, string>).reason?.includes('not valid')) {
      return thunkAPI.rejectWithValue('unauthorized');
    }
    return thunkAPI.rejectWithValue('Не удалось обновить данные');
  }
});
