import React, { FC } from 'react';
import { defaulAvatar } from '../../consts/prefix';
import './UserAvatar.scss';

type UserAvatarProps = {
  username?: string;
  avatarPath?: string;
  onClick?: () => void;
  classname?: string;
  text?: string;
};

export const UserAvatar: FC<UserAvatarProps> = (props) => {
  const { username, avatarPath, onClick, classname, text } = props;
  return (
    <div className={classname ? classname : 'avatar'} onClick={onClick}>
      <img
        className="avatar__img"
        src={avatarPath ? avatarPath : defaulAvatar}
        alt={username ? username : 'Аватарка'}
      />
      {text && <div className="avatar__text">{text}</div>}
    </div>
  );
};
