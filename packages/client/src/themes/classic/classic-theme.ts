import end from './sounds/end.mp3';
import line from './sounds/line.mp3';
import position from './sounds/position.mp3';
import start from './sounds/start.mp3';

import lightBg from './light/img/background/light.jpg';
import darkBg from './dark/img/background/dark.jpg';

import tetris from './music/TECHNOTRIS.mp3';
import { Sequence } from '../../pages/Game/constant';

export const classicMusic = tetris;

export const classicSounds = {
  start: start,
  end: end,
  fall: position,
  position: position,
  line: line,
};

export const lightThemeBackground = lightBg;
export const darkThemeBackground = darkBg;

export const initStateThemeLight = {
  backgroundColor: 'var(--body-bg-light)',
  fontColor: 'var(--body-color-light)',
  links: 'var(--color-links-light)',
};
// все-таки поменяем классическую на светлую

export const initStateThemeDark = {
  backgroundColor: 'var(--body-bg-dark)',
  fontColor: 'var(--body-color-dark)',
  links: 'var(--color-links-dark)',
};

export const colors: Record<Sequence, string> = {
  I: '#FFDD00',
  O: '#0DCAF0',
  T: '#EE82EE',
  S: '#CB0000',
  Z: '#FFA500',
  J: '#0000FF',
  L: '#008000',
};

export const colorsDarkTheme: Record<Sequence, string> = {
  I: '#BB9A00',
  O: '#008FD5',
  T: '#8B3576',
  S: '#9E1F1F',
  Z: '#D37859',
  J: '#1D31AC',
  L: '#015800',
};
