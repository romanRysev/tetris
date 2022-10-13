import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button/Button';

import './Error.scss';

interface IError {
  nameError: string;
  textError: string;
}

const Error: FC<IError> = ({ nameError, textError }) => {
  const navigate = useNavigate();
  return (
    <div className="error">
      <div className="error__text">
        <h2 className="error__title">{nameError}</h2>
        <p className="error__subtitle">{textError}</p>
      </div>
      <div className="error__link">
        <Button backgroundOpacity={true} onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    </div>
  );
};

export default Error;
