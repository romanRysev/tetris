import React, { FC } from 'react';

import defaultAvatar from '../../assets/avatar.svg';

import './style.scss';

type AvatarProps = {
  avatarPath?: string;
  onClick: () => void;
};

export const Avatar: FC<AvatarProps> = ({ avatarPath, onClick }) => {
  return (
    <div className="avatar" onClick={onClick}>
      <img className="avatar__img" src={avatarPath ? avatarPath : defaultAvatar} alt="avatar" />
      <span className="avatar__text"> Поменять аватар </span>
    </div>
  );
};
