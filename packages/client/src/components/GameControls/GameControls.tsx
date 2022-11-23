import React, { FC, useCallback } from 'react';

import arrowLeft from '../../assets/control-arrow-left.svg';
import arrowUp from '../../assets/control-arrow-up.svg';
import arrow from '../../assets/control-arrow-drop.svg';
import arrowDown from '../../assets/control-arrow-down.svg';
import arrowRight from '../../assets/control-arrow-right.svg';

import './GameControls.scss';

export const GameControls: FC = () => {
  const handleClickLeft = useCallback(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
  }, []);

  const handleClickTop = useCallback(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
  }, []);

  const handleClickSpace = useCallback(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
  }, []);

  const handleClickDown = useCallback(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
  }, []);

  const handleClickRight = useCallback(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
  }, []);

  return (
    <div className="game-controls">
      <button
        className="game-controls__button game-controls__button_vertical game-controls__button_border-left"
        onClick={handleClickLeft}
      >
        <img className="button__img" src={arrowLeft} alt="Влево" />
      </button>
      <span className="game-controls__button-wrapper">
        <button className="game-controls__button game-controls__button_horizontal" onClick={handleClickTop}>
          <img className="button__img" src={arrowUp} alt="Вверх" />
        </button>
        <button className="game-controls__button game-controls__button_horizontal" onClick={handleClickSpace}>
          <img className="button__img" src={arrow} alt="Пробел" />
        </button>
        <button className="game-controls__button game-controls__button_horizontal" onClick={handleClickDown}>
          <img className="button__img" src={arrowDown} alt="Вниз" />
        </button>
      </span>
      <button
        className="game-controls__button game-controls__button_vertical game-controls__button_border-right"
        onClick={handleClickRight}
      >
        <img className="button__img" src={arrowRight} alt="Вправо" />
      </button>
    </div>
  );
};
