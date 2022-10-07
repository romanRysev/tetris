import React, { FC } from 'react';
import { Button } from '../../Button/Button';
import './LeftPanel.scss';

export const LeftPanel: FC = () => {
  return (
    <div className="link-to-game_theme_light">
      <Button
        className="link-to-game__button"
        onClick={() => {
          console.log('CLICK');
        }}
      >
        {' '}
      </Button>
    </div>
  );
};
