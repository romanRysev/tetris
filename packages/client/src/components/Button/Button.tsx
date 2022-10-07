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

export const Button: React.FC<Props> = ({
  className,
  backgroundOpacity = false,
  children,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const _className = classNames('button', 'button_theme_light', backgroundOpacity ? 'button_opacity' : '', className);
  const _classNameText = classNames('button__text', backgroundOpacity ? 'button__text_opacity' : '');

  return (
    <button type={type} onClick={onClick} className={_className} disabled={disabled}>
      <p className={_classNameText}>{children}</p>
    </button>
  );
};
