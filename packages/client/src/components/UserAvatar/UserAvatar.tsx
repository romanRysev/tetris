import classNames from 'classnames';
import React, { FC } from 'react';
import { defaulAvatar } from '../../helpers/prefix';
import './UserAvatar.scss';

type UserAvatarProps = {
  username?: string;
  avatarPath?: string;
  onClick?: () => void;
  classname?: string;
  text?: string;
};

export const UserAvatar: FC<UserAvatarProps> = ({ username, avatarPath = defaulAvatar, onClick, classname, text }) => {
  return (
    <div className={classNames('avatar', 'user-avatar', { classname })} onClick={onClick}>
      <img className="avatar__img" src={avatarPath} alt={username ?? 'Аватарка'} />
      {text && <div className="avatar__text">{text}</div>}
    </div>
  );
};
