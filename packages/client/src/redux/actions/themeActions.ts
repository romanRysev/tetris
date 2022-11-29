import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThemesNames } from '../../themes/themes';

export const setGameTheme = createAsyncThunk('theme', async (data: ThemesNames, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось поменять тему');
  }
});

export const setDayOrNight = createAsyncThunk('theme/global', async (data: 'dark' | 'light', thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось поменять тему');
  }
});

export const toggleMusicOnOff = createAsyncThunk('theme', async (data: boolean, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось включить/выключить музыку');
  }
});

export const toggleSoundOnOff = createAsyncThunk('theme', async (data: boolean, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось включить/выключить звук');
  }
});

export const setMusicVol = createAsyncThunk('theme', async (data: number, thunkAPI) => {
  console.log('set');
  try {
    thunkAPI.fulfillWithValue(data);
    console.log(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось установить громкость музыки');
  }
});

export const setSoundVol = createAsyncThunk('theme', async (data: string, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось установить громкость звука');
  }
});
