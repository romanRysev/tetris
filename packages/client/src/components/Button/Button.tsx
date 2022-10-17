import React from 'react';
import classNames from 'classnames';

import './button.scss';

interface Props {
  className?: string;
  children: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
  backgroundOpacity?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

const Button: React.FC<Props> = ({
  className,
  backgroundOpacity = false,
  children,
  onClick,
  disabled = false,
  type,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames('button', 'button_theme_light', backgroundOpacity ? 'button_opacity' : '', className)}
      disabled={disabled}
      {...rest}
    >
      <p className={classNames('button__text', backgroundOpacity ? 'button__text_opacity' : '')}>{children}</p>
    </button>
  );
};

export default React.memo(Button);
