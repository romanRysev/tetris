/* eslint-disable camelcase */
import React, { FC } from 'react';
import { defaulAvatar, filePrefix } from '../../../consts/prefix';
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import './UpperMenuUserInfo.scss';

export type UserProps = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export const MenuUserInfo: FC<UserProps> = ({ first_name, second_name, display_name, avatar }) => {
  const avatarUrl = avatar ? `${filePrefix}${avatar}` : defaulAvatar;
  const name = display_name ? display_name : `${first_name} ${second_name}`;

  return (
    <div className="user-info">
      <UserAvatar avatarPath={avatarUrl} classname="user-info__avatar" />
      <div className="user-info__name_theme_light" onClick={() => console.log('ТУТ ДОЛЖЕН БЫТЬ ПЕРЕХОД НА ПРОФИЛЬ')}>
        {name}
      </div>
    </div>
  );
};
