import { createSlice } from '@reduxjs/toolkit';
import { ThemesNames } from '../../themes/themes';
import {
  setDayOrNight,
  setGameTheme,
  setMusicVol,
  setSoundVol,
  toggleMusicOnOff,
  toggleSoundOnOff,
} from '../actions/themeActions';

interface IThemeSlice {
  global: 'light' | 'dark';
  active: ThemesNames;
  soundOn: boolean;
  musicOn: boolean;
  soundLevel: string;
  musicLevel: string;
}

const themeInitState: IThemeSlice = {
  global: 'light',
  active: 'classic',
  soundOn: true,
  musicOn: true,
  soundLevel: '0.5',
  musicLevel: '0.5',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitState,
  reducers: {},
  extraReducers: {
    [setGameTheme.fulfilled.type]: (state, action) => {
      state.active = action.meta.arg;
    },
    [setDayOrNight.fulfilled.type]: (state, action) => {
      state.global = action.meta.arg;
    },
    [toggleMusicOnOff.fulfilled.type]: (state, action) => {
      state.musicOn = action.meta.arg;
    },
    [toggleSoundOnOff.fulfilled.type]: (state, action) => {
      state.soundOn = action.meta.arg;
    },
    [setMusicVol.fulfilled.type]: (state, action) => {
      state.musicLevel = action.meta.arg;
    },
    [setSoundVol.fulfilled.type]: (state, action) => {
      state.soundLevel = action.meta.arg;
    },
  },
});
