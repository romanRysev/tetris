import classNames from 'classnames';
import React, { FC, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import './UpperMenu__Item.scss';

export type MenuItemProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
  link?: string;
  title?: string;
  className?: string;
};

export const UpperMenuItem: FC<MenuItemProps> = ({ text, link, title, onClick, className }) => {
  const item = link ? (
    <NavLink to={link} className={classNames('upper-menu__link', className)}>
      {text}
    </NavLink>
  ) : (
    text
  );

  return (
    <li className={classNames('upper-menu__item', className)} onClick={onClick} title={title ?? text}>
      {item}
    </li>
  );
};
