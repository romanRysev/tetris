import React, { FC, useState } from 'react';

import { MenuItemProps, UpperMenuItem } from '../UpperMenuItem/UpperMenuItem';
import './UpperMenu.scss';
import { APIurls } from '../../../consts/prefix';
import { MenuUserInfo, UserProps } from '../UpperMenuUserInfo/UpperMenuUserInfo';

async function logout() {
  const response = await fetch(APIurls.LOGOUT, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

function handleLogout() {
  logout().then((response) => {
    console.log(response);
  });
}

const menuLinks: MenuItemProps[] = [
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
    text: 'Настройки',
    link: '/settings',
  },
  {
    text: 'Как играть',
    link: '/howto',
  },
];

const dummyUser: UserProps = {
  id: 1,
  first_name: 'Phil',
  second_name: 'Punxatawny',
  display_name: '',
  login: 'phil',
  email: 'phil@punxatawny.com',
  phone: '0192837462',
  avatar: '',
};

export const UpperMenu: FC = () => {
  const [isNight, setIsNight] = useState(false);
  return (
    <div className="upper-menu_theme_light">
      <MenuUserInfo {...dummyUser} />

      <div className="menu-list__wrapper">
        <ul className="menu-list">
          {menuLinks.map((item, index) => (
            <UpperMenuItem text={item.text} link={item.link} key={index} />
          ))}
          {!isNight && <UpperMenuItem text="Ночная тема" onClick={() => setIsNight(true)} key="night" />}
          {!!isNight && <UpperMenuItem text="Дневная тема" onClick={() => setIsNight(false)} key="night" />}
          <UpperMenuItem text="Выйти" onClick={handleLogout} key="logout" />
        </ul>
      </div>
    </div>
  );
};
