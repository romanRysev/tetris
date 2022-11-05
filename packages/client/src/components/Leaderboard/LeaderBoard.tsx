import React, { FC, useEffect, useState } from 'react';
import { setLeaderBoard } from '../../redux/actions/leaderBoardActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { GetLeaders } from '../../utils/api';
import { LeaderItem } from '../LeaderItem/LeaderItem';

import './LeaderBoard.scss';

export type LeaderBoardProps = {
  title?: string;
};

export const LeaderBoard: FC<LeaderBoardProps> = ({ title = 'Доска почета' }) => {
  const dispatch = useAppDispatch();
  const leaderList = Object.values(useAppSelector((state) => state.leaders.leaderList));
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const req: GetLeaders = {
      ratingFieldName: 'score',
      cursor: 0,
      limit: 10,
    };
    if (!isLoaded) {
      (async () => {
        const res = await dispatch(setLeaderBoard(req));
        if (res.meta.requestStatus === 'fulfilled') {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, leaderList, isLoaded]);

  return (
    <div className="leaderboard">
      <h3 className="leaderboard__header">{title}</h3>
      {!leaderList && <div>Пока никого нет. Стань первым :)</div>}

      <ul className="leaderboard__list leaderboard__list_top">
        {leaderList &&
          leaderList
            .slice(0, 3)
            .map((leader, index) => (
              <LeaderItem
                avatar={leader.data.user.avatar}
                userName={leader.data.user.userName}
                score={leader.data.score}
                key={'top' + index}
              />
            ))}
      </ul>

      <ul className="leaderboard__list">
        {leaderList &&
          leaderList
            .slice(3, 10)
            .map((leader, index) => (
              <LeaderItem
                avatar={leader.data.user.avatar}
                userName={leader.data.user.userName}
                score={leader.data.score}
                key={'leader' + index}
              />
            ))}
      </ul>
    </div>
  );
};
