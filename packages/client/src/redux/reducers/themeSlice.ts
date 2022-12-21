import { createSlice } from '@reduxjs/toolkit';
import { ThemesNames } from '../../themes/themes';
import {
  putTheme,
  setGameTheme,
  setGuestTheme,
  setMusicVol,
  setSoundVol,
  setTheme,
  toggleMusicOnOff,
  toggleSoundOnOff,
} from '../actions/themeActions';

export interface IThemeSlice {
  active: ThemesNames;
  soundOn: boolean;
  musicOn: boolean;
  soundLevel: string;
  musicLevel: string;
  isFetched: number;
  isSet: boolean;
}

export const themeInitState: IThemeSlice = {
  active: 'newYear',
  soundOn: true,
  musicOn: true,
  soundLevel: '0.5',
  musicLevel: '0.5',
  isFetched: 0,
  isSet: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitState,
  reducers: {},
  extraReducers: {
    [setGameTheme.fulfilled.type]: (state, action) => {
      state.active = action.meta.arg;
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
    [setTheme.fulfilled.type]: (state, action) => {
      const { soundOn, musicOn, musicLevel, soundLevel, themeActive } = action.payload;
      state.active = themeActive;
      state.soundOn = soundOn;
      state.musicOn = musicOn;
      state.soundLevel = soundLevel;
      state.musicLevel = musicLevel;
      state.isFetched = Date.now();
    },
    [putTheme.fulfilled.type]: (state, action) => {
      state.isFetched = Date.now();
    },
    [setGuestTheme.fulfilled.type]: (state, action) => {
      state.active = action.meta.arg;
      state.isSet = true;
    },
  },
});
