import React from 'react';
import classNames from 'classnames';

import './Button.scss';

type Props = React.PropsWithChildren<{
  className?: string;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
  disabled?: boolean;
  backgroundOpacity?: boolean;
  type?: 'button' | 'reset' | 'submit';
}>;

export const Button: React.FC<Props> = ({ ...rest }) => {
  const { backgroundOpacity, className, children, ...otherProps } = rest;
  return (
    <button
      {...otherProps}
      className={classNames('button', 'button_theme_light', backgroundOpacity ? 'button_opacity' : '', className)}
    >
      <p className={classNames('button__text', backgroundOpacity ? 'button__text_opacity' : '')}>{children}</p>
    </button>
  );
};
