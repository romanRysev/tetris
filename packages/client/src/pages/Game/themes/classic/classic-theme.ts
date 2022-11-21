import end from './sounds/end.mp3';
import line from './sounds/line.mp3';
import position from './sounds/position.mp3';
import start from './sounds/start.mp3';

import tetris from './music/TECHNOTRIS.mp3';
import { Sequence } from '../../constant';

export const classicMusic = tetris;

export const classicSounds = {
  start: start,
  end: end,
  fall: position,
  position: position,
  line: line,
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
