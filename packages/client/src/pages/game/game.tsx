import React, { useEffect, useRef, useState } from 'react';
import './game.scss';
import foto from '../../assets/avatar.svg';
import { Tetris } from './game-screen';
import { tetrominoSequence, playfield, tetrominos, colors } from './constant';
export const Game: React.FC = () => {
  const [IsGameStarted, setIsGameStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefFigure = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasFigure = canvasRefFigure.current;
    if (canvas && canvasFigure) {
      const context = canvas.getContext('2d');
      const contextFigure = canvasFigure.getContext('2d');
      if (context && contextFigure) {
        context.fillStyle = '#B0E0E6';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      }
    }
  }, []);
  const startGame = () => {
    setIsGameStarted(true);
    const w = new Tetris(
      'canvas',
      10,
      20,
      canvasRef,
      canvasRef.current,
      tetrominoSequence,
      playfield,
      tetrominos,
      colors,
    );
    w.init();
    w.onKeypress();
    function step() {
      requestAnimationFrame(step);
      w.loop();
    }
    step();
  };

  return (
    <div className="game-container">
      <div className="menu-game">
        <h2>меню</h2>
        <li>новая игра</li>
        <li>как играть</li>
        <li>доска почета</li>
        <li>мой профиль</li>
        <li>форум</li>
        <li>ночная тема</li>
        <li>настройки</li>
        <li>выйти</li>
      </div>
      <div className="game-screen">
        <canvas ref={canvasRef} id="canvas" width={500} height={1000}></canvas>
        <div className="button-wrapper">
          <div className="button-wrapper-inner">
            {!IsGameStarted && (
              <button className="start-btn" onClick={startGame}>
                Начать игру
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="game-info">
        <div className="next-figure">
          <canvas ref={canvasRefFigure} id="canvas-figure"></canvas>
        </div>
        <div className="score-game">
          <img className="avatar" src={foto} alt="" />
          <p>Счет</p>
          <p>Уровень</p>
          <p>Линии</p>
        </div>
      </div>
    </div>
  );
};
