import React, { FC, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import './UpperMenu__Item.scss';

export type MenuItemProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
  link?: string;
  title?: string;
};

export const UpperMenuItem: FC<MenuItemProps> = ({ text, link, title, onClick }) => {
  const item = link ? (
    <NavLink to={link} className="upper-menu__link">
      {text}
    </NavLink>
  ) : (
    text
  );

  return (
    <li className="upper-menu__item" onClick={onClick} title={title ?? text}>
      {item}
    </li>
  );
};
