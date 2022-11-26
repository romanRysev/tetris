import { makeThemeColors, ThemeColorsProps } from '../themes/classic/classic-theme';

export const setCSSProperties = (theme: ThemeColorsProps) => {
  const props = makeThemeColors(theme);
  const colors = Object.values(props);
  const vars = Object.keys(props);
  colors.map((color, index) => {
    document.documentElement.style.setProperty(vars[index], color);
  });
};
