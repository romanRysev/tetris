import React, { BaseSyntheticEvent, FC } from 'react';

import './background-blur.scss';

type PopupProps = {
  onClick: (event: BaseSyntheticEvent) => void;
  children: React.ReactNode | string;
};

export const BackgroundBlur: FC<PopupProps> = ({ onClick, children }) => {
  return (
    <div className="background-blur" onClick={onClick}>
      {children}
    </div>
  );
};
