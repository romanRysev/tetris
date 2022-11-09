import React from 'react';

import './Spinner.scss';

export const Spinner = () => {
  return (
    <div className="spinner">
      <span className="spinner__dot">
        <i className="spinner__item" />
        <i className="spinner__item" />
        <i className="spinner__item" />
        <i className="spinner__item" />
      </span>
    </div>
  );
};
