import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThemesNames } from '../../themes/themes';
import { getTheme, getUserFromDB, sendThemeToDB, sendUserToDB } from '../../utils/backEndApi';
import { UserChars } from '../reducers/userSlice';
import { store } from '../store';

export const setGameTheme = createAsyncThunk('theme/active', async (data: ThemesNames, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось поменять тему');
  }
});

export const toggleMusicOnOff = createAsyncThunk('theme/musicOn', async (data: boolean, thunkAPI) => {
  console.log(data);
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось включить/выключить музыку');
  }
});

export const toggleSoundOnOff = createAsyncThunk('theme/soundOn', async (data: boolean, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось включить/выключить звук');
  }
});

export const setMusicVol = createAsyncThunk('theme/musicLevel', async (data: string, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось установить громкость музыки');
  }
});

export const setSoundVol = createAsyncThunk('theme/soundLevel', async (data: string, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось установить громкость звука');
  }
});

export const setTheme = createAsyncThunk('theme/set', async (data: UserChars, thunkAPI) => {
  try {
    const { id } = data;
    const res = await getUserFromDB(id);
    if (res?.ok && res?.text.length > 0) {
      console.log(res.text);
      const user = await res.json();
      if (user.id) {
        console.log('есть id');
        const userTheme = await getTheme(id);
        if (userTheme?.ok) {
          return thunkAPI.fulfillWithValue(await userTheme.json());
        }
      } else if (res?.ok) {
        const userTheme = store.getState().theme;
        const userProfile = store.getState().auth.user;
        const { soundOn, musicOn, musicLevel, soundLevel, active } = userTheme;
        const { id } = userProfile;
        await sendUserToDB(userProfile);
        await sendThemeToDB({ soundOn, musicOn, musicLevel, soundLevel, themeActive: active, userID: id });
      } else {
        console.log('не прошло');
      }
    }
    const err = await res?.json();
    throw new Error(err.reason);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
