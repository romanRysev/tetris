import React, { FC } from 'react';
import { defaulAvatar, filePrefix } from '../../helpers/prefix';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import './LeaderItem.scss';

export type LeaderProps = {
  avatar?: string;
  name: string;
  onClick?: () => void;
  score: string;
};

export const LeaderItem: FC<LeaderProps> = ({
  avatar,
  name,
  onClick = () => console.log('ТУТ БУДЕТ ССЫЛКА НА ПРОФИЛЬ'),
  score,
}) => {
  return (
    <li className="leader-list__item">
      <UserAvatar
        username={name}
        avatarPath={avatar ? filePrefix + avatar : defaulAvatar}
        classname="avatar"
        onClick={onClick}
      />
      <div className="name" onClick={onClick}>
        {name}
      </div>
      <div className="score">{score}</div>
    </li>
  );
};
