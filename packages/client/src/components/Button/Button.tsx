import React from 'react';
import './index.scss';

interface Props {
  className?: string;
  children: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button(props: Props) {
  const { onClick, className, disabled, children } = props;
  return (
    <button onClick={onClick} className={classNames('button', 'button_theme_light', className)} disabled={disabled}>
      {children}
    </button>
  );
}
