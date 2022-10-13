import React, { PropsWithChildren } from 'react';
import { LeftPanel } from '../LeftPanel/LeftPanel';
import { UpperMenu } from '../UpperMenu/UpperMenu';
import './StaticLayout.scss';

export const StaticLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="main__wrapper">
      <LeftPanel />
      <UpperMenu />
      {children}
    </div>
  );
};
