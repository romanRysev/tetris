import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThemesNames } from '../../themes/themes';
import { getTheme, IThemeProps, sendThemeToDB, sendUserToDB, updateTheme } from '../../utils/backEndApi';
import { UserChars } from '../reducers/userSlice';
import { RootState, store } from '../store';

export const setGameTheme = createAsyncThunk('theme/active', async (data: ThemesNames, thunkAPI) => {
  try {
    const userProfile: UserChars = store.getState().auth.user;
    await updateTheme({ themeActive: data }, userProfile.id);
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось поменять тему');
  }
});

export const toggleMusicOnOff = createAsyncThunk('theme/musicOn', async (data: boolean, thunkAPI) => {
  try {
    const userProfile: UserChars = store.getState().auth.user;
    await updateTheme({ musicOn: data }, userProfile.id);
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось включить/выключить музыку');
  }
});

export const toggleSoundOnOff = createAsyncThunk('theme/soundOn', async (data: boolean, thunkAPI) => {
  try {
    const userProfile: UserChars = store.getState().auth.user;
    await updateTheme({ soundOn: data }, userProfile.id);
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

export const setTheme = createAsyncThunk('theme', async (_, thunkAPI) => {
  try {
    const userProfile: UserChars = store.getState().auth.user;
    const { id } = userProfile;
    await sendUserToDB(userProfile);
    const userTheme = await getTheme(id);
    const isTheme = await userTheme.json();
    if (isTheme != null) {
      return thunkAPI.fulfillWithValue(isTheme);
    } else {
      const initTheme = store.getState().theme;
      const { soundOn, musicOn, musicLevel, soundLevel, active } = initTheme;
      await sendThemeToDB({ soundOn, musicOn, musicLevel, soundLevel, themeActive: active, userID: id });
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const putTheme = createAsyncThunk(
  'theme/put',
  async (data: IThemeProps, thunkAPI) => {
    try {
      await sendThemeToDB({ ...data });
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось отправить тему на сервер');
    }
  },
  {
    condition: (data, { getState, extra }) => {
      const { theme } = getState() as RootState;
      const date = theme.isFetched;
      const now = Date.now();
      if (date && date - now < 100000) {
        return false;
      }
    },
  },
);
