import React, { ReactNode } from 'react';
import { UpperMenu } from '../UpperMenu/UpperMenu/UpperMenu';
import { LeftPanel } from './LeftPanel/LeftPanel';
import './StaticLayout.scss';

type StaticLayoutProps = {
  content: ReactNode;
};

export const StaticLayout: React.FC<StaticLayoutProps> = (props) => {
  const { content } = props;
  return (
    <div className="main-wrapper">
      <LeftPanel />
      <UpperMenu />
      {content}
    </div>
  );
};
