import classNames from 'classnames';
import React, { FC } from 'react';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import './LeaderItem.scss';

export type LeaderProps = {
  avatar: string;
  userName: string;
  onClick?: () => void;
  score: number;
};

export const LeaderItem: FC<LeaderProps> = ({ avatar, userName, score }) => {
  return (
    <li className={classNames('leaderboard-item', top && 'leaderboard-item_top')}>
      <UserAvatar username={userName} avatarPath={avatar} className="leaderboard-item__avatar" />
      <div className="leaderboard-item__name">{userName}</div>
      <div className="leaderboard-item__score">{score}</div>
    </li>
  );
};
