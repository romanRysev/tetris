import React, { FC, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import './UpperMenuItem.scss';

export type MenuItemProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
  link?: string;
  title?: string;
};

export const UpperMenuItem: FC<MenuItemProps> = (props) => {
  const { text, link, title, onClick } = props;
  const item = link ? (
    <NavLink to={link} className="upper-menu__link_theme_light">
      {text}
    </NavLink>
  ) : (
    text
  );

  return (
    <li className="menu-list__item" onClick={onClick} title={title ? title : text}>
      {item}
    </li>
  );
};
