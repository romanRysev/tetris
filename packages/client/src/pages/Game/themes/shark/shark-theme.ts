import manBasic from './../shark/img/man/man-basic.png';
import manHeadLeft from './../shark/img/man/man-basic-head-left.png';
import manLeftLegUP from './../shark/img/man/man-left-leg-up.png';
import manRightLegUp from './../shark/img/man/man-right-leg-up.png';
import manEnd1 from './../shark/img/man/man-going-left.png';
import manEnd2 from './../shark/img/man/man-fist-1.png';
import manEnd3 from './../shark/img/man/man-fist-2.png';

import shark1 from './../shark/img/shark/shark-1.png';
import shark2 from './../shark/img/shark/shark-2.png';
import sharkM1 from './../shark/img/shark/shark-mirror-1.png';
import sharkM2 from './../shark/img/shark/shark-mirror-2.png';
import sharkEnd1 from './../shark/img/shark/shark-sad.png';
import sharkEnd2 from './../shark/img/shark/shark-sad-2.png';

import splash from './../shark/sounds/splash.mp3';
import splashSm from './../shark/sounds/splash-sm.mp3';
import swirl from './../shark/sounds/swirl.mp3';
import laughter from './../shark/sounds/villain-laughter.mp3';
import pouring from './../shark/sounds/water-pouring-a.mp3';

import jaws from './../shark/music/jaws.mp3';

import beachImg from './../shark/img/background/beach.jpg';

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
