import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThemesNames } from '../reducers/themeSlice';

export const setGameTheme = createAsyncThunk('theme', async (data: ThemesNames, thunkAPI) => {
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
