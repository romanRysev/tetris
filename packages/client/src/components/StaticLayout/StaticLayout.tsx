import React, { FC, ReactNode } from 'react';
import { UpperMenu } from '../UpperMenu/UpperMenu/UpperMenu';
import { LeftPanel } from './LeftPanel/LeftPanel';
import './StaticLayout.scss';

type StaticLayoutProps = {
  children: ReactNode;
};

export const StaticLayout: FC<StaticLayoutProps> = ({ children }) => {
  return (
    <div className="main__wrapper">
      <LeftPanel />
      <UpperMenu />
      {children}
    </div>
  );
};
