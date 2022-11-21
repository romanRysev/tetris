import { createSlice } from '@reduxjs/toolkit';
import { ThemesNames } from '../../pages/Game/themes/themes';
import { setDayOrNight, setGameTheme } from '../actions/themeActions';

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
