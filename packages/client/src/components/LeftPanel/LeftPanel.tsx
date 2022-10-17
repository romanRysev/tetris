import React, { FC } from 'react';
import { Button } from '../Button/Button';
import './LeftPanel.scss';

export const LeftPanel: FC = () => {
  return (
    <div className="left-panel">
      <Button
        className="left-panel__button"
        onClick={() => {
          console.log('CLICK');
        }}
      >
        {' '}
      </Button>
    </div>
  );
};
