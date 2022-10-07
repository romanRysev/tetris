import React, { FC } from 'react';
import { LeaderItem, LeaderProps } from '../LeaderItem/LeaderItem';

import './LeaderBoard.scss';

const dummyLeaders: LeaderProps[] = [
  {
    avatar: '',
    name: 'Сангвиний',
    score: '15 000',
  },
  {
    avatar: '',
    name: 'Хорус',
    score: '13 625',
  },
  {
    avatar: '',
    name: 'Корвус',
    score: '12 848',
  },
  {
    avatar: '',
    name: 'Ночной Призрак',
    score: '9 376',
  },
  {
    avatar: '',
    name: 'ИМПЕРАТОР',
    score: '6 373',
  },
  {
    name: 'СиГиЛлИт',
    score: '2 334',
  },
  {
    name: 'Демонетка с правого фланга',
    score: '1 432',
  },
];

export type LeaderBoardProps = {
  title?: string;
};

export const LeaderBoard: FC<LeaderBoardProps> = ({ title = 'Доска почета' }) => {
  return (
    <div className="leaderboard__wrapper_theme_light">
      <h3 className="leaderboard__section-header">{title}</h3>
      <div className="leaderboard__top">
        <ul className="leaderboard__top-list">
          {dummyLeaders.slice(0, 3).map((leader, index) => (
            <LeaderItem avatar={leader.avatar} name={leader.name} score={leader.score} key={'top' + index} />
          ))}
        </ul>
      </div>
      <div className="leaderboard__leaders">
        <ul className="leaderboard__list">
          {dummyLeaders.slice(3, 10).map((leader, index) => (
            <LeaderItem avatar={leader.avatar} name={leader.name} score={leader.score} key={'leader' + index} />
          ))}
        </ul>
      </div>
    </div>
  );
};
