import React, { FC, useRef } from 'react';
import './UpperMenu.scss';
import { UserInfo } from '../UserInfo/UserInfo';
import { MenuItemProps, UpperMenuItem } from './__Item/UpperMenu__Item';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/singActions';
import { setGameTheme } from './../../redux/actions/themeActions';
import { ThemesNames, themesOptions } from '../../themes/themes';

const menuLinks: MenuItemProps[] = [
  {
    text: 'ИГРАТЬ',
    link: '/game',
  },
  {
    text: 'Мой профиль',
    link: '/profile',
  },
  {
    text: 'Форум',
    link: '/phorum',
  },
  {
    text: 'Доска почета',
    link: '/leaderboard',
  },
  {
    text: 'Как играть',
    link: '/howto',
  },
];

export const UpperMenu: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleThemeSelect = async () => {
    const val = selectRef.current?.value;
    const req: ThemesNames = val ? themesOptions[val] : 'classic';
    selectRef.current?.blur();
    return await dispatch(setGameTheme(req));
  };

  const themeActive = useAppSelector((state) => state.theme.active);

  const defaultSelectValue = () => {
    let activeValue = '';
    Object.values(themesOptions).map((value, index) => {
      if (value == themeActive) {
        activeValue = Object.keys(themesOptions)[index];
      }
    });
    return activeValue;
  };

  const userProfile = useAppSelector((state) => state.auth.user);

  return (
    <div className="upper-menu">
      <UserInfo {...userProfile} />

      <nav className="upper-menu__nav">
        <ul className="upper-menu__list">
          {menuLinks.map((item, index) => (
            <UpperMenuItem text={item.text} link={item.link} key={index} />
          ))}
          <span className="upper-menu__theme">
            Тема:{' '}
            <select
              value={defaultSelectValue()}
              ref={selectRef}
              onChange={handleThemeSelect}
              className="upper-menu__select"
            >
              {Object.keys(themesOptions).map((theme, index) => (
                <option key={index} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </span>
          <UpperMenuItem text="Выйти" onClick={handleLogout} className="upper-menu__item-logout" key="logout" />
        </ul>
      </nav>
    </div>
  );
};
