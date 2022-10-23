import React, { PropsWithChildren } from 'react';
import { BackButton } from '../BackButton/BackButton';
import { UpperMenu } from '../UpperMenu/UpperMenu';
import './StaticLayout.scss';

export const StaticLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="main">
      <BackButton to="/" />
      <UpperMenu />
      {children}
    </div>
  );
};
