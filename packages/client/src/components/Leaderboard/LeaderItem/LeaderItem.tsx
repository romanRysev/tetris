import React from 'react';
import { defaulAvatar } from '../../../consts/prefix';
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import './LeaderItem.scss';

export type LeaderProps = {
  avatar?: string;
  name: string;
  onClick?: () => void;
  score: string;
};

export const LeaderItem: React.FC<LeaderProps> = ({
  avatar = defaulAvatar,
  name,
  onClick = () => console.log('ТУТ БУДЕТ ССЫЛКА НА ПРОФИЛЬ'),
  score,
  ...props
}) => {
  return (
    <li className="leader-list__item_theme_light">
      <UserAvatar username={name} avatarPath={avatar} classname="avatar_theme_light" onClick={onClick} />
      <div className="name_theme_light" onClick={onClick}>
        {name}
      </div>
      <div className="score_theme_light">{score}</div>
    </li>
  );
};
