import React, { FC, PropsWithChildren } from 'react';
import { UpperMenu } from '../UpperMenu/UpperMenu/UpperMenu';
import { LeftPanel } from './LeftPanel/LeftPanel';
import './StaticLayout.scss';

export const StaticLayout: FC = ({ children }: PropsWithChildren) => {
  return (
    <div className="main__wrapper">
      <LeftPanel />
      <UpperMenu />
      {children}
    </div>
  );
};
