/* eslint-disable camelcase */
import React, { FC, useEffect, useState } from 'react';
import './UpperMenu.scss';
import { UserInfo } from '../UserInfo/UserInfo';
import { MenuItemProps, UpperMenuItem } from './__Item/UpperMenu__Item';
import { dummyUser } from '../../consts/dummyData';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/singActions';
import { getProfileRequest } from '../../utils/api';

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
  const [isNight, setIsNight] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  const [userProfile, setUserProfile] = useState(dummyUser);
  const [isLoadedUserProfile, setLoadedUserProfile] = useState(false);

  useEffect(() => {
    if (!isLoadedUserProfile) {
      // TODO брать из стора
      retrieveUser();
      setLoadedUserProfile(true);
    }
  }, [isLoadedUserProfile]);

  const retrieveUser = async () => {
    const response = await getProfileRequest().then((resp) => {
      return resp.text();
    });
    const { id, first_name, second_name, display_name, login, email, phone, avatar } = JSON.parse(response);

    setUserProfile({
      id: id,
      first_name: first_name,
      second_name: second_name,
      display_name: display_name,
      login: login,
      email: email,
      phone: phone,
      avatar: avatar,
    });
  };

  return (
    <div className="upper-menu">
      <UserInfo {...userProfile} />

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
