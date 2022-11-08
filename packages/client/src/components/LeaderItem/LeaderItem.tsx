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

export const LeaderItem: FC<LeaderProps> = ({
  avatar,
  userName,
  onClick = () => console.log('ТУТ БУДЕТ ССЫЛКА НА ПРОФИЛЬ'),
  score,
}) => {
  return (
    <li className={classNames('leaderboard-item', top && 'leaderboard-item_top')}>
      <UserAvatar username={userName} avatarPath={avatar} onClick={onClick} className="leaderboard-item__avatar" />
      <div className="leaderboard-item__name" onClick={onClick}>
        {userName}
      </div>
      <div className="leaderboard-item__score">{score}</div>
    </li>
  );
};
