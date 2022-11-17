import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Game.scss';
import { Tetris } from './Tetris';
import { Link, useNavigate } from 'react-router-dom';
import { makeUserAvatarFromUser, makeUserNameFromUser } from '../../utils/makeUserProps';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/actions/singActions';
import { setGameTheme } from '../../redux/actions/themeActions';
import { ThemesNames } from '../../redux/reducers/themeSlice';
import classNames from 'classnames';
import { themesOptions } from './themes';
// import { AddLeader, addToLeaderBoard } from '../../utils/api';

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
  // const [showError, setShowError] = useState(false);
  // const [errorMsg, setErrorMsg] = useState('Что-то пошло не так :(');
  const theme = useAppSelector((state) => state.theme.active);
  const [isLevelsActive, setLevelsActive] = useState(false);

  // под тему
  const addThemeToClassName = `_theme_${theme}`;

  const getData = useCallback((score: number, level: number, lineCount: number) => {
    setScore(score);
    setLevel(level);
    setLineCount(lineCount);
  }, []);
  const getEnd = useCallback(() => {
    setGameEnded(true);
  }, []);

  // const sendResult = useCallback(() => {
  //   const date = new Date();
  //   const res: AddLeader = {
  //     data: {
  //       score: score,
  //       user: {
  //         avatar: userAvatar,
  //         userName: userName,
  //         id: userProfile.id,
  //       },
  //       date: date.toLocaleDateString('ru'),
  //     },
  //     ratingFieldName: 'score',
  //     teamName: 'CodinskTest',
  //   };
  //   const send = async (res: AddLeader) => {
  //     try {
  //       const result = await addToLeaderBoard(res);
  //       const resp = await result.json();
  //       if (resp.ok) {
  //         setShowError(false);
  //       } else {
  //         setShowError(true);
  //         setErrorMsg(`Что-то пошло не так :( сервер говорит ${JSON.stringify(resp)}`);
  //       }
  //     } catch (error) {
  //       return;
  //     }
  //   };
  //   send(res);
  // }, [score, userAvatar, userName, userProfile.id]);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setScore(0);
    setLevel(0);
    setLineCount(0);
    setGameNo(gameNo + 1);
  }, [gameNo]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  const handleNewGame = useCallback(() => {
    setGameEnded(false);
    startGame();
  }, [startGame]);

  const toProfile = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  // const handleErrorMsg = useCallback(() => {
  //   setShowError(false);
  // }, []);
  const selectRef = useRef<HTMLSelectElement>(null);
  // const themesOptions: Record<string, ThemesNames> = {
  //   Классическая: 'classic',
  //   Челюсти: 'shark',
  // };
  const handleThemeSelect = async () => {
    const val = selectRef.current?.value;
    console.log(val);
    const req: ThemesNames = val ? themesOptions[val] : 'classic';
    console.log(req);
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

  const [isMusicOn, setMusicOn] = useState(true);
  const [isSoundOn, setSoundOn] = useState(true);
  const [musicLevel, setMusicLevel] = useState('0.5');
  const [soundLevel, setSoundLevel] = useState('0.5');

  const toggleMusic = useCallback(() => {
    setMusicOn(!isMusicOn);
    console.log(isMusicOn);
  }, [isMusicOn]);

  const toggleSound = useCallback(() => {
    setSoundOn(!isSoundOn);
  }, [isSoundOn]);

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

  useEffect(() => {
    console.log('USEFFECT MOUNT');
    // const sendResult = () => {
    //   const date = new Date();
    //   const res: AddLeader = {
    //     data: {
    //       score: score,
    //       user: {
    //         avatar: userAvatar,
    //         userName: userName,
    //         id: userProfile.id,
    //       },
    //       date: date.toLocaleDateString('ru'),
    //     },
    //     ratingFieldName: 'score',
    //     teamName: 'CodinskTest',
    //   };
    //   const send = async (res: AddLeader) => {
    //     try {
    //       const result = await addToLeaderBoard(res);
    //       const resp = await result.json();
    //       if (resp.ok) {
    //         setShowError(false);
    //       } else {
    //         setShowError(true);
    //         setErrorMsg(`Что-то пошло не так :( сервер говорит ${JSON.stringify(resp)}`);
    //       }
    //     } catch (error) {
    //       return;
    //     }
    //   };
    //   send(res);
    // };
    const canvas = canvasRef.current;
    const canvasFigure = canvasRefFigure.current;
    if (canvas && canvasFigure) {
      const context = canvas.getContext('2d');
      const contextFigure = canvasFigure.getContext('2d');
      if (context && contextFigure) {
        context.fillStyle = '#eee';
        context.strokeStyle = '#111';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
      }
    }
    console.log(eqSoundsRef.current);
    eqMusicRef.current?.setAttribute('orient', 'vertical');
    eqSoundsRef.current?.setAttribute('orient', 'vertical');
    // console.log(store.getState());
    // console.log(theme);
    // console.log(addThemeToClassName);
    // if (isGameEnded) {
    //   sendResult();
    //   console.log(isGameEnded, IsGameStarted);
    // }
    // return () => {
    //   console.log('USEFFECT UNMOUNT');
    // };
  }, [IsGameStarted, theme, addThemeToClassName]);

  return (
    <div className="game">
      {theme === 'shark' && <div className="background background_theme_shark"></div>}
      <div className={classNames(['game-menu', `game-menu${addThemeToClassName}`])}>
        <h2 className="game-menu__header">Меню</h2>
        <div className="select-theme">
          <span>
            Тема:{' '}
            <select ref={selectRef} onChange={handleThemeSelect} className="select-theme__select">
              {Object.keys(themesOptions).map((theme, index) => (
                <option key={theme + index}>{theme}</option>
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
            <Link className="game-menu__link" to="/phorum">
              Форум
            </Link>
          </li>
        </ul>
        <ul className="game-menu__submenu">
          <li
            className={
              theme === 'shark'
                ? 'game-menu__link game-menu__link_theme_shark game-menu__link_accent'
                : 'game-menu__link game-menu__link_color-red'
            }
            onClick={handleLogout}
          >
            Выйти
          </li>
        </ul>
      </div>
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
        {/* {showError && (
          <div className="game-screen__error">
            <h3 className="game-screen__h3">Ошибка с отправкой результатов</h3>
            <p>{errorMsg}</p>
            <button className="game-screen__error-button" onClick={handleErrorMsg}>
              Понятно
            </button>
          </div>
        )} */}
      </div>
      <div className="game-info">
        <div className={classNames('game-info__next-figure', `game-info__next-figure${addThemeToClassName}`)}>
          <canvas className="game-info__canvas-figure" ref={canvasRefFigure} id="canvas-figure"></canvas>
        </div>
        <p>Следующая фигура</p>
        <div className="game-info__user-info">
          <img className="game-info__avatar" src={userAvatar} alt="" onClick={toProfile} />
          <Link
            className={classNames('game-info__user-name', `game-info__user-name${addThemeToClassName}`)}
            to="/profile"
          >
            {userName}
          </Link>
        </div>
        <div className="game-info__score">
          <p className={classNames('game-info__p', `game-info__p${addThemeToClassName}`)}>Счет: {score}</p>
          <p className={classNames('game-info__p', `game-info__p${addThemeToClassName}`)}>Уровень: {level}</p>
          <p className={classNames('game-info__p', `game-info__p${addThemeToClassName}`)}>Линии: {lineCount}</p>
        </div>
        <div
          className={
            theme === 'shark'
              ? 'game-info__sound-controls game-info__sound-controls_theme_shark'
              : 'game-info__sound-controls'
          }
        >
          <div className="sound-controls sound-controls__sound" ref={soundRef} onClick={toggleSound}></div>
          <div className="sound-controls sound-controls__equalizer" ref={levelsRef} onClick={handleShowLevels}></div>
          {isLevelsActive && (
            <div className="levels">
              <div className="levels__sound">
                <input
                  type="range"
                  min="0"
                  max="2"
                  defaultValue="1"
                  step="0.01"
                  ref={eqSoundsRef}
                  className="sound-controls__input"
                  onChange={handleSoundVolume}
                ></input>
                <div className="sound-controls sound-controls__sound"></div>
              </div>
              <div className="levels__music">
                <input
                  type="range"
                  min="0"
                  max="2"
                  defaultValue="1"
                  step="0.01"
                  ref={eqMusicRef}
                  className="sound-controls__input"
                  onChange={handleMusicVolume}
                ></input>
                <div className="sound-controls sound-controls__music"></div>
              </div>
              <div className="levels__hide" onClick={handleHideLevels}>
                X
              </div>
            </div>
          )}
          {isLevelsActive && <div className="levels-background" onClick={handleHideLevels}></div>}
          <div className="sound-controls sound-controls__music" ref={musicRef} onClick={toggleMusic}></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
