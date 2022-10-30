/* eslint-disable camelcase */
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaulAvatar, filePrefix } from '../../utils/constants';
import { UserAvatar } from '../UserAvatar/UserAvatar';

import './UserInfo.scss';

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

export const UserInfo: FC<UserProps> = ({ first_name, second_name, display_name, avatar }) => {
  const avatarUrl = avatar ? `${filePrefix}${avatar}` : defaulAvatar;
  const name = display_name ? display_name : `${first_name} ${second_name}`;
  const navigate = useNavigate();
  const handleProfile = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  return (
    <div className="user-info">
      <UserAvatar avatarPath={avatarUrl} className="user-info__avatar" onClick={handleProfile} />
      <div className="user-info__name" onClick={handleProfile}>
        {name}
      </div>
    </div>
  );
};
