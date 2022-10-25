import classNames from 'classnames';
import React, { FC } from 'react';
import { defaulAvatar } from '../../utils/constants';
import './UserAvatar.scss';

type UserAvatarProps = {
  username?: string;
  avatarPath?: string;
  onClick?: () => void;
  className?: string;
  text?: string;
};

export const UserAvatar: FC<UserAvatarProps> = ({ username, avatarPath, onClick, className, text }) => {
  return (
    <div className={classNames('user-avatar', className)} onClick={onClick}>
      <img className="user-avatar__img" src={avatarPath ?? defaulAvatar} alt={username ?? 'Аватарка'} />
      {text && <div className="user-avatar__text">{text}</div>}
    </div>
  );
};
