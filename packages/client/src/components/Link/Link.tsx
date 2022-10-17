import React, { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './link.scss';

interface LinkProps extends PropsWithChildren {
  to: string;
  color?: 'black' | 'blue' | 'red';
  className?: string;
}

export const Link: FC<LinkProps> = ({ color = 'blue', to, children, className }) => {
  return (
    <NavLink className={classNames(className, 'link', `link_${color}`)} to={to}>
      {children}
    </NavLink>
  );
};
