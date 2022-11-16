import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThemesNames } from '../reducers/themeSlice';

export const setGameTheme = createAsyncThunk('theme', async (data: ThemesNames, thunkAPI) => {
  console.log('1', data);
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось поменять тему');
  }
});

export const setDayOrNight = createAsyncThunk('theme/light', async (data: boolean, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось поменять тему');
  }
});

// export const setAvatar = createAsyncThunk('auth/user/avatar', async (data: FormData, thunkAPI) => {
//   try {
//     const res = await setAvatarRequest(data);
//     const user = await res.json();
//     return res.ok ? thunkAPI.fulfillWithValue({ ...user }) : thunkAPI.rejectWithValue('Не удалось загрузить аватар');
//   } catch (e) {
//     return thunkAPI.rejectWithValue('Не удалось загрузить аватар');
//   }
// });

// export const setProfileInfo = createAsyncThunk('auth/user', async (data: IChangeInfo, thunkAPI) => {
//   try {
//     const res = await setProfileInfoRequest(data);
//     const user = await res.json();
//     return res.ok ? thunkAPI.fulfillWithValue({ ...user }) : thunkAPI.rejectWithValue('Не удалось обновить данные');
//   } catch (e) {
//     return thunkAPI.rejectWithValue('Не удалось обновить данные');
//   }
// });

// export const setProfilePassword = createAsyncThunk('auth/user/password', async (data: IChangePassword, thunkAPI) => {
//   try {
//     const res = await setProfilePasswordRequest(data);
//     return res.ok ? thunkAPI.fulfillWithValue({}) : thunkAPI.rejectWithValue('Не удалось обновить пароль');
//   } catch (e) {
//     return thunkAPI.rejectWithValue('Не удалось обновить данные');
//   }
// });
