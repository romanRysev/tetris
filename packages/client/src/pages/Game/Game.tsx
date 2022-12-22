import React, { BaseSyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import './Game.scss';
import './Game_info.scss';
import './Game_menu.scss';
import './Game_screen.scss';
import { Tetris } from './Tetris';
import { Link, useNavigate } from 'react-router-dom';
import { makeUserAvatarFromUser, makeUserNameFromUser } from '../../utils/makeUserProps';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/actions/singActions';
import {
  putTheme,
  setGameTheme,
  setMusicVol,
  setSoundVol,
  setTheme,
  toggleMusicOnOff,
  toggleSoundOnOff,
} from '../../redux/actions/themeActions';
import classNames from 'classnames';
import { ThemesNames, themesOptions } from '../../themes/themes';
import { GameControls } from '../../components/GameControls/GameControls';
import { maxMobileWidth } from './constant';
import menu from '../../assets/menu.svg';
import { BackgroundBlur } from '../../components/BackgroundBlur/BackgroundBlur';
import { Button } from '../../components/Button/Button';
import { sendThemeToDB, sendUserToDB } from '../../utils/backEndApi';

export const Game: React.FC = () => {
  const [IsGameStarted, setIsGameStarted] = useState(false);
  const [gameNo, setGameNo] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefFigure = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [isGameEnded, setGameEnded] = useState(false);
  const userProfile = useAppSelector((state) => state.auth.user);
  const userName = makeUserNameFromUser(userProfile);
  const userAvatar = makeUserAvatarFromUser(userProfile);
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const theme = useAppSelector((state) => state.theme.active);
  const userTheme = useAppSelector((state) => state.theme);
  const isSoundOn = useAppSelector((state) => state.theme.soundOn);
  const isMusicOn = useAppSelector((state) => state.theme.musicOn);
  const initMusicLevel = useAppSelector((state) => state.theme.musicLevel);
  const initSoundLevel = useAppSelector((state) => state.theme.soundLevel);
  const [isLevelsActive, setLevelsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(document.documentElement.clientWidth <= maxMobileWidth);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isSentUser, setSentUser] = useState(false);

  const menuElem = useRef<HTMLInputElement>(null);
  // под тему
  const addThemeToClassName = `_theme_${theme}`;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(document.documentElement.clientWidth <= maxMobileWidth);
    });
  }, []);

  useEffect(() => {
    if (!isSentUser) {
      setSentUser(true);
      setTimeout(() => {
        dispatch(setTheme());
      }, 2000);
    }
  }, [dispatch, isSentUser]);

  const getData = useCallback((score: number, level: number, lineCount: number) => {
    setScore(score);
    setLevel(level);
    setLineCount(lineCount);
  }, []);
  const getEnd = useCallback(() => {
    setGameEnded(true);
  }, []);

  const startGame = useCallback(() => {
    setShowMobileMenu(false);
    setIsGameStarted(true);
    setScore(0);
    setLevel(0);
    setLineCount(0);
    setGameNo(gameNo + 1);
  }, [gameNo]);

  const handleNewGame = useCallback(() => {
    setGameEnded(false);
    startGame();
  }, [startGame]);

  const toProfile = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  const selectRef = useRef<HTMLSelectElement>(null);
  const defaultSelectValue = () => {
    let activeValue = '';
    Object.values(themesOptions).map((value, index) => {
      if (value == theme) {
        activeValue = Object.keys(themesOptions)[index];
      }
    });
    return activeValue;
  };
  const handleThemeSelect = async () => {
    const val = selectRef.current?.value;
    const req: ThemesNames = val ? themesOptions[val] : 'classic';
    selectRef.current?.blur();
    canvasRef.current?.focus();
    return await dispatch(setGameTheme(req));
  };

  // контролы звука
  const musicRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLDivElement>(null);
  const eqMusicRef = useRef<HTMLInputElement>(null);
  const eqSoundsRef = useRef<HTMLInputElement>(null);

  const [musicLevel, setMusicLevel] = useState(initMusicLevel);
  const [soundLevel, setSoundLevel] = useState(initSoundLevel);

  const toggleMusic = useCallback(async () => {
    return await dispatch(toggleMusicOnOff(!isMusicOn));
  }, [dispatch, isMusicOn]);

  const toggleSound = useCallback(async () => {
    return await dispatch(toggleSoundOnOff(!isSoundOn));
  }, [dispatch, isSoundOn]);

  const handleSoundVolume = useCallback(() => {
    const vol = eqSoundsRef.current?.value || '0.5';
    setSoundLevel(vol);
  }, []);

  const handleMusicVolume = useCallback(() => {
    const vol = eqMusicRef.current?.value || '0.5';
    setMusicLevel(vol);
  }, []);

  const handleShowLevels = useCallback(() => {
    setLevelsActive(true);
  }, []);

  const handleHideLevels = useCallback(() => {
    setLevelsActive(false);
  }, []);

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === 'fulfilled') {
      const { soundOn, musicOn } = userTheme;
      const { id } = userProfile;
      await sendUserToDB(userProfile);
      await sendThemeToDB({ soundOn, musicOn, musicLevel, soundLevel, themeActive: theme, userID: id });
      navigate('/login');
    }
  };

  const handleMenuOpen = useCallback(() => {
    setShowMobileMenu(true);
    setIsPause(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setShowMobileMenu(false);
    setIsPause(false);
  }, []);

  const handleScreenClick = useCallback(
    (event: BaseSyntheticEvent) => {
      const withinBoundaries = menuElem.current === event.target || menuElem.current?.contains(event.target);
      if (!withinBoundaries) {
        handleMenuClose();
      }
    },
    [handleMenuClose],
  );

  const handleNightTheme = async () => {
    if (theme === 'classic') {
      await dispatch(setGameTheme('dark'));
    } else if (theme === 'dark') {
      await dispatch(setGameTheme('classic'));
    } else if (!theme) {
      await dispatch(setGameTheme('dark'));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasFigure = canvasRefFigure.current;
    if (canvas && canvasFigure) {
      const context = canvas.getContext('2d');
      const contextFigure = canvasFigure.getContext('2d');
      if (context && contextFigure) {
        context.fillStyle = 'rgba(255, 255, 255, 0)';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      }
    }
    return () => {
      const { soundOn, musicOn, musicLevel, soundLevel, isFetched } = userTheme;
      const { id } = userProfile;
      if (isFetched != 0) {
        (async () => {
          await dispatch(setMusicVol(musicLevel));
          await dispatch(setSoundVol(soundLevel)); // тут апдейт ннада
          await dispatch(putTheme({ soundOn, musicOn, musicLevel, soundLevel, themeActive: theme, userID: id }));
        })();
      }
    };
  }, [
    userProfile,
    userTheme,
    IsGameStarted,
    theme,
    addThemeToClassName,
    eqMusicRef,
    eqSoundsRef,
    dispatch,
    musicLevel,
    soundLevel,
  ]);

  return (
    <div className={classNames('game', `game${addThemeToClassName}`)}>
      {isMobile && <GameControls />}
      {isMobile && showMobileMenu && <BackgroundBlur onClick={handleScreenClick} />}
      {(!isMobile || (isMobile && showMobileMenu)) && (
        <div ref={menuElem} className={classNames(['game-menu', `game-menu${addThemeToClassName}`])}>
          <h2 className="game-menu__header">Меню</h2>
          <div className="select-theme">
            <span>
              Тема:{' '}
              <select
                value={defaultSelectValue()}
                ref={selectRef}
                onChange={handleThemeSelect}
                className="select-theme__select"
              >
                {Object.keys(themesOptions).map((theme, index) => (
                  <option key={index}>{theme}</option>
                ))}
              </select>
            </span>
          </div>
          <ul className="game-menu__submenu">
            <li className="game-menu__link" onClick={startGame}>
              Новая игра
            </li>
            <li>
              <Link className="game-menu__link" to="/howto">
                Как играть
              </Link>
            </li>

            <li>
              <Link className="game-menu__link" to="/leaderboard">
                Доска почета
              </Link>
            </li>
          </ul>
          <ul className="game-menu__submenu">
            <li>
              <Link className="game-menu__link" to="/profile">
                Мой профиль
              </Link>
            </li>
          </ul>
          <ul className="game-menu__submenu">
            <li>
              <Link className="game-menu__link" to="/forum">
                Форум
              </Link>
            </li>
          </ul>
          {theme === 'classic' && (
            <ul className="game-menu__submenu">
              <li onClick={handleNightTheme}>Ночная тема</li>
            </ul>
          )}
          {theme === 'dark' && (
            <ul className="game-menu__submenu">
              <li onClick={handleNightTheme}>Дневная тема</li>
            </ul>
          )}
          <ul className="game-menu__submenu">
            <li className="game-menu__link game-menu__link_color-red" onClick={handleLogout}>
              Выйти
            </li>
          </ul>

          {isMobile && <Button onClick={handleMenuClose}> Вернуться к игре </Button>}
        </div>
      )}

      <div className="game-screen">
        <canvas className="game-screen__canvas" ref={canvasRef} id="canvas" width={500} height={1000}>
          {IsGameStarted && canvasRef.current && canvasRefFigure.current && (
            <>
              <Tetris
                canvas={canvasRef.current}
                canvasFigure={canvasRefFigure.current}
                getDataUp={getData}
                sendEnd={getEnd}
                gameNo={gameNo}
                isAuthorized={isAuthorized}
                userProfile={userProfile}
                theme={theme}
                musicOn={isMusicOn}
                soundOn={isSoundOn}
                soundVolume={soundLevel}
                musicVolume={musicLevel}
                isPause={isPause}
              />
            </>
          )}
        </canvas>
        {!IsGameStarted && (
          <button className="game-screen__start-button" onClick={startGame}>
            Начать игру
          </button>
        )}
        {isGameEnded && (
          <div className="game-screen__game-end">
            <h3 className="game-screen__h3">Игра окончена!</h3>
            <p>Вы добрались до {level} уровня</p>
            <p>Ваш счет: {score} очков</p>
            <button className="game-screen__end-button" onClick={handleNewGame}>
              Играть снова
            </button>
          </div>
        )}
      </div>
      <div className="game-info">
        <div className="game-info__menu">
          <button className="game-info__button" onClick={handleMenuOpen}>
            <img className="game-info__button-img" src={menu} />
          </button>
          <div className={classNames('game-info__next-figure', `game-info__next-figure${addThemeToClassName}`)}>
            <canvas className="game-info__canvas-figure" ref={canvasRefFigure} id="canvas-figure"></canvas>
          </div>
          {!isMobile && <p>Следующая фигура</p>}
          <div className="game-info__user-info">
            <img className="game-info__avatar" src={userAvatar} alt="" onClick={toProfile} />
            <Link
              className={classNames('game-info__user-name', `game-info__user-name${addThemeToClassName}`)}
              to="/profile"
            >
              {userName}
            </Link>
          </div>
        </div>
        <div className="game-info__score">
          <p className={classNames('game-info__p', `game-info__p${addThemeToClassName}`)}>Счет: {score}</p>
          <p className={classNames('game-info__p', `game-info__p${addThemeToClassName}`)}>Уровень: {level}</p>
          <p className={classNames('game-info__p', `game-info__p${addThemeToClassName}`)}>Линии: {lineCount}</p>
        </div>
        <div className={classNames('game-info__sound-controls', `game-info__sound-controls${addThemeToClassName}`)}>
          {isSoundOn && (
            <div className="sound-controls sound-controls__sound" ref={soundRef} onClick={toggleSound}></div>
          )}
          {!isSoundOn && (
            <div
              className="sound-controls sound-controls__sound sound-controls_vol_mute"
              ref={soundRef}
              onClick={toggleSound}
            ></div>
          )}
          <div className="sound-controls sound-controls__equalizer" ref={levelsRef} onClick={handleShowLevels}></div>
          {isLevelsActive && (
            <div className="levels">
              <div className="levels__sound">
                <input
                  {...{ orient: 'vertical' }}
                  type="range"
                  min="0"
                  max="2"
                  defaultValue={soundLevel}
                  step="0.01"
                  ref={eqSoundsRef}
                  className="sound-controls__input"
                  onChange={handleSoundVolume}
                ></input>
                <div className="levels__sound-controls levels__sound-controls_sound"></div>
              </div>
              <div className="levels__music">
                <input
                  {...{ orient: 'vertical' }}
                  type="range"
                  min="0"
                  max="2"
                  defaultValue={musicLevel}
                  step="0.01"
                  ref={eqMusicRef}
                  className="sound-controls__input"
                  onChange={handleMusicVolume}
                ></input>
                <div className="levels__sound-controls levels__sound-controls_music"></div>
              </div>
              <div className="levels__hide" onClick={handleHideLevels}>
                X
              </div>
            </div>
          )}
          {isLevelsActive && <div className="levels-background" onClick={handleHideLevels}></div>}
          {isMusicOn && (
            <div className="sound-controls sound-controls__music" ref={musicRef} onClick={toggleMusic}></div>
          )}
          {!isMusicOn && (
            <div
              className="sound-controls sound-controls__music sound-controls_vol_mute"
              ref={musicRef}
              onClick={toggleMusic}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
