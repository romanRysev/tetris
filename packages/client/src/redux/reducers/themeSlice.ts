import { createSlice } from '@reduxjs/toolkit';
import { ThemesNames } from '../../themes/themes';
import { setDayOrNight, setGameTheme } from '../actions/themeActions';

interface IThemeSlice {
  global: 'light' | 'dark';
  active: ThemesNames;
}

const themeInitState: IThemeSlice = {
  global: 'light',
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
      state.global = action.meta.arg;
    },
  },
});
