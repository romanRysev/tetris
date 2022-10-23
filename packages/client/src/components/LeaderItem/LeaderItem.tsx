import classNames from 'classnames';
import React, { FC } from 'react';
import { defaulAvatar, filePrefix } from '../../helpers/prefix';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import './LeaderItem.scss';

export type LeaderProps = {
  avatar?: string;
  name: string;
  onClick?: () => void;
  score: string;
  top?: boolean;
};

export const LeaderItem: FC<LeaderProps> = ({
  avatar,
  name,
  onClick = () => console.log('ТУТ БУДЕТ ССЫЛКА НА ПРОФИЛЬ'),
  score,
  top,
}) => {
  return (
    <li className={classNames('leaderboard-item', top && 'leaderboard-item_top')}>
      <UserAvatar
        username={name}
        avatarPath={avatar ? filePrefix + avatar : defaulAvatar}
        onClick={onClick}
        className="leaderboard-item__avatar"
      />
      <div className="leaderboard-item__name" onClick={onClick}>
        {name}
      </div>
      <div className="leaderboard-item__score">{score}</div>
    </li>
  );
};
