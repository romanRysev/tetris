import { Sequence } from '../pages/Game/constant';
import { classicStroke, colors, fillColorLight } from '../themes/classic/classic-theme';
import { themes, ThemesNames } from '../themes/themes';

export type ThemeColors = {
  colors: Record<Sequence, string>;
  fill: string;
  stroke: string;
};

export const setThemeColors = (theme: ThemesNames): ThemeColors => {
  const themeColors: Record<Sequence, string> = themes[theme].colors || colors;
  const themeFill: string = themes[theme].fillCanvas || fillColorLight;
  const themeStroke: string = themes[theme].themeStroke || classicStroke;
  return {
    colors: themeColors,
    fill: themeFill,
    stroke: themeStroke,
  };
};
