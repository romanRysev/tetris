import React from 'react';

import './Spinner.scss';

export const Spinner = () => {
  return (
    <div className="spin">
      <span className="spin__dot">
        <i className="spin__dot_item" />
        <i className="spin__dot_item" />
        <i className="spin__dot_item" />
        <i className="spin__dot_item" />
      </span>
    </div>
  );
};
