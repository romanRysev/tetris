import { createSlice } from '@reduxjs/toolkit';
import { setDayOrNight, setGameTheme } from '../actions/themeActions';

export type ThemesNames = 'classic' | 'shark';

interface IThemeSlice {
  light: boolean;
  active: ThemesNames;
}

const themeInitState: IThemeSlice = {
  light: true,
  active: 'classic',
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
      state.light = action.meta.arg;
    },
  },
});
