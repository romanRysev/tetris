/* Если кто-то будет добавлять тему
 *
 * Фоновая картинка, музыка (в количестве одного трека) и звуки (в количестве пяти вариаций
 *  - ускоренное падение,
 *  - падение,
 *  - убирание ряда,
 *  - начало игры,
 *  - конец игры) добавляются полуавтоматически.
 * Если нужны какие-то другие варианты звуков на события, либо анимация,
 * то добавлять самостоятельно.
 *
 * Чтобы добавить тему фон + музыка + звуки, нужно
 *  - поставить импорты звуков,
 *  - дополнить константы themes, ThemesNames, themesOptions, musicTrackTime
 * Вроде должно работать
 *
 */

import { Sequence } from '../pages/Game/constant';
import {
  classicMusic,
  classicSounds,
  classicStroke,
  colors,
  colorsDarkTheme,
  darkThemeBackground,
  fillColorDark,
  fillColorLight,
  lightThemeBackground,
} from './classic/classic-theme';
import { man, shark, sharkBackground, sharkMusic, sharkSounds, sharkStroke } from './shark/shark-theme';
import { NewYearBackground, NYStroke, NYMusic, NYsounds } from './newYear/new-year';

export type StringObject = Record<string, string>;

export interface ThemeProps {
  sounds?: ThemeSounds;
  music?: string;
  images?: Record<string, StringObject> | StringObject | string;
  backgroundImg?: string;
  fillCanvas?: string;
  colors?: Record<Sequence, string>;
  themeStroke?: string;
}

export interface ThemeSounds {
  start?: string; // начало игры
  end?: string; // конец игры
  fall?: string; // быстрая установка (пробел)
  position?: string; // обычная установка
  line?: string; // собран ряд
  steps?: string; // for New-Year theme
}

export const themes: Record<string, ThemeProps> = {
  shark: {
    // обозначение темы
    sounds: sharkSounds, // звуки в формате ThemeSounds
    music: sharkMusic, // музыкальная запись 1 штука
    images: {
      // картинки для анимации
      man: man,
      shark: shark,
    },
    backgroundImg: sharkBackground, // картинка на фон
    themeStroke: sharkStroke,
  },
  newYear: {
    // обозначение темы
    sounds: NYsounds, // звуки в формате ThemeSounds
    music: NYMusic, // музыкальная запись 1 штука
    backgroundImg: NewYearBackground, // картинка на фон
    themeStroke: NYStroke,
  },
  classic: {
    sounds: classicSounds,
    music: classicMusic,
    backgroundImg: lightThemeBackground,
    fillCanvas: fillColorLight,
    colors: colors,
    themeStroke: classicStroke,
  },
  dark: {
    sounds: classicSounds,
    music: classicMusic,
    backgroundImg: darkThemeBackground,
    fillCanvas: fillColorDark,
    colors: colorsDarkTheme,
    themeStroke: classicStroke,
  },
};

export type ThemesNames = 'classic' | 'shark' | 'dark' | 'newYear';

export const themesOptions: Record<string, ThemesNames> = {
  // Обозначение в селекте тем : обозначение темы
  Классическая: 'classic',
  Челюсти: 'shark',
  Темная: 'dark',
  newYear: 'newYear',
};

export const musicTrackTime: Record<ThemesNames, number> = {
  classic: 0,
  shark: 0,
  dark: 0,
  newYear: 0,
};

export interface ThemeFlags {
  classic?: boolean;
  shark?: boolean;
  dark?: boolean;
  newYear?: boolean;
}

export type SoundControls = {
  context: AudioContext;
  track: MediaElementAudioSourceNode;
  gainNode: GainNode;
};
