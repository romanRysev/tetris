import manBasic from './../../assets/img/man/man-basic.png';
import manHeadLeft from './../../assets/img/man/man-basic-head-left.png';
import manLeftLegUP from './../../assets/img/man/man-left-leg-up.png';
import manRightLegUp from './../../assets/img/man/man-right-leg-up.png';

import shark1 from './../../assets/img/shark/shark-1.png';
import shark2 from './../../assets/img/shark/shark-2.png';
import sharkM1 from './../../assets/img/shark/shark-mirror-1.png';
import sharkM2 from './../../assets/img/shark/shark-mirror-2.png';

import splash from './../../assets/sounds/shark/splash.mp3';
import splashSm from './../../assets/sounds/shark/splash-sm.mp3';
import swirl from './../../assets/sounds/shark/swirl.mp3';
import laughter from './../../assets/sounds/shark/villain-laughter.mp3';
import pouring from './../../assets/sounds/shark/water-pouring-a.mp3';

import end from './../../assets/sounds/light/end.mp3';
import line from './../../assets/sounds/light/line.mp3';
import position from './../../assets/sounds/light/position.mp3';
import start from './../../assets/sounds/light/start.mp3';

import jaws from './../../assets/music/jaws.mp3';
import sandman from './../../assets/music/Mr. Sandman.mp3';

export type StringObject = Record<string, string>;

export interface ThemeProps {
  sounds?: StringObject;
  music?: string;
  images?: Record<string, StringObject> | StringObject | string;
  backgroundImg?: string;
}

export const man: Record<string, string> = {
  basic: manBasic,
  head: manHeadLeft,
  leftLeg: manLeftLegUP,
  rightLeg: manRightLegUp,
};

export const shark: Record<string, string> = {
  basic: shark1,
  left: shark2,
  basicM: sharkM1,
  leftM: sharkM2,
};

export const sharkMusic = jaws;

export const sharkSounds = {
  start: pouring,
  end: laughter,
  fall: splash,
  position: splashSm,
  line: swirl,
};

export const lightMusic = sandman;

export const lightSounds = {
  start: start,
  end: end,
  fall: position,
  position: position,
  line: line,
};

export const themes: Record<string, ThemeProps> = {
  shark: {
    sounds: sharkSounds,
    music: sharkMusic,
    images: {
      man: man,
      shark: shark,
    },
    backgroundImg: '',
  },
  light: {
    sounds: lightSounds,
    music: lightMusic,
    backgroundImg: '',
  },
};
