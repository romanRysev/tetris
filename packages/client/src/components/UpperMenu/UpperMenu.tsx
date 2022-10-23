import React, { FC, useState } from 'react';
import './UpperMenu.scss';
import { UserInfo } from '../UserInfo/UserInfo';
import { APIurls } from '../../helpers/prefix';
import { MenuItemProps, UpperMenuItem } from './__Item/UpperMenu__Item';
import { dummyUser } from '../../consts/dummyData';

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
    text: 'Как играть',
    link: '/howto',
  },
];

export const UpperMenu: FC = () => {
  const [isNight, setIsNight] = useState(false);
  return (
    <div className="upper-menu">
      <UserInfo {...dummyUser} />

      <nav className="upper-menu__nav">
        <ul className="upper-menu__list">
          {menuLinks.map((item, index) => (
            <UpperMenuItem text={item.text} link={item.link} key={index} />
          ))}
          {!isNight && <UpperMenuItem text="Ночная тема" onClick={() => setIsNight(true)} key="day" />}
          {!!isNight && <UpperMenuItem text="Дневная тема" onClick={() => setIsNight(false)} key="night" />}
          <UpperMenuItem text="Выйти" onClick={handleLogout} key="logout" />
        </ul>
      </nav>
    </div>
  );
};
