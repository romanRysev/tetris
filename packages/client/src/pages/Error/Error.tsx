import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './Error.scss';

interface IError {
  nameError: string;
  textError: string;
}

const Error: FC<IError> = ({ nameError, textError }) => {
  return (
    <div className="error">
      <div className="error__text">
        <h2 className="error__title">{nameError}</h2>
        <p className="error__subtitle">{textError}</p>
      </div>
      <div className="error__link">
        <Link to="/" className="error__link_text">
          Назад
        </Link>
      </div>
    </div>
  );
};

export default Error;
