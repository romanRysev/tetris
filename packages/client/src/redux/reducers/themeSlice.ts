import { createSlice } from '@reduxjs/toolkit';
import { setGameTheme } from '../actions/themeActions';

export type ThemesNames = 'classic' | 'shark';

interface IThemeSlice {
  active: ThemesNames;
}

const themeInitState: IThemeSlice = {
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
  },
});
