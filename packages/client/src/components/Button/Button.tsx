import React from 'react';
import classNames from 'classnames';

import './button.scss';

interface Props {
  className?: string;
  children: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
}

const button: React.FC<Props> = ({ className, children, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} className={classNames('button', 'button_theme_light', className)} disabled={disabled}>
      {children}
    </button>
  );
};

export const Button = button;
