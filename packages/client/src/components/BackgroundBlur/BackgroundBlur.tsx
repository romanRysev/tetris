import React, { BaseSyntheticEvent, FC, PropsWithChildren } from 'react';

import './BackgroundBlur.scss';

interface PopupProps extends PropsWithChildren {
  onClick: (event: BaseSyntheticEvent) => void;
}

export const BackgroundBlur: FC<PopupProps> = ({ onClick, children }) => {
  return (
    <div className="background-blur" onClick={onClick}>
      {children}
    </div>
  );
};
