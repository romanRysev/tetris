/* eslint-disable camelcase */
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserChars } from '../../redux/reducers/userSlice';
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

export const UserInfo: FC<UserChars> = ({ firstName, secondName, displayName, avatar }) => {
  const avatarUrl = avatar ? `${filePrefix}${avatar}` : defaulAvatar;
  const name = displayName || `${firstName} ${secondName}`;
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
