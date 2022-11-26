import manBasic from './img/man/man-basic.png';
import manHeadLeft from './img/man/man-basic-head-left.png';
import manLeftLegUP from './img/man/man-left-leg-up.png';
import manRightLegUp from './img/man/man-right-leg-up.png';
import manEnd1 from './img/man/man-going-left.png';
import manEnd2 from './img/man/man-fist-1.png';
import manEnd3 from './img/man/man-fist-2.png';

import shark1 from './img/shark/shark-1.png';
import shark2 from './img/shark/shark-2.png';
import sharkM1 from './img/shark/shark-mirror-1.png';
import sharkM2 from './img/shark/shark-mirror-2.png';
import sharkEnd1 from './img/shark/shark-sad.png';
import sharkEnd2 from './img/shark/shark-sad-2.png';

import splash from './sounds/splash.mp3';
import splashSm from './sounds/splash-sm.mp3';
import swirl from './sounds/swirl.mp3';
import laughter from './sounds/villain-laughter.mp3';
import pouring from './sounds/water-pouring-a.mp3';

import jaws from './music/jaws.mp3';

import beachImg from './img/background/beach.jpg';

export const man: Record<string, string> = {
  basic: manBasic,
  head: manHeadLeft,
  leftLeg: manLeftLegUP,
  rightLeg: manRightLegUp,
  end1: manEnd1,
  end2: manEnd2,
  end3: manEnd3,
};

export const shark: Record<string, string> = {
  basic: shark1,
  left: shark2,
  basicM: sharkM1,
  leftM: sharkM2,
  end1: sharkEnd1,
  end2: sharkEnd2,
};

export const sharkMusic = jaws;

export const sharkSounds = {
  start: pouring,
  end: laughter,
  fall: splash,
  position: splashSm,
  line: swirl,
};

export const sharkBackground = beachImg;

export const sharkStroke = '#EEEEEE';

export const water = 'rgba(0, 188, 255, 0.2)';
