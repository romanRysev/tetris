import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import arrowLeft from '../../assets/arrow-left.svg';

import './backButton.scss';

interface Props {
  to: string;
}

export const BackButton: FC<Props> = ({ to }) => {
  return (
    <NavLink to={to} className="back-button">
      <img src={arrowLeft} className="back-button__img" alt="Назад" />
    </NavLink>
  );
};
