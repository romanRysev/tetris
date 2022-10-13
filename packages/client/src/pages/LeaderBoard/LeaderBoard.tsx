import React from 'react';
import { LeaderBoard } from '../../components/Leaderboard/LeaderBoard';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';
import './../../scss/index.scss';

export const LeaderBoardPage = () => {
  return <StaticLayout>{<LeaderBoard />}</StaticLayout>;
};
