import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import './button.scss';

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  backgroundOpacity?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

export const Button: React.FC<Props> = ({
  className,
  backgroundOpacity = false,
  children,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames('button', 'button_theme_light', backgroundOpacity ? 'button_opacity' : '', className)}
      disabled={disabled}
    >
      <p className={classNames('button__text', backgroundOpacity ? 'button__text_opacity' : '')}>{children}</p>
    </button>
  );
};
