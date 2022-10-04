import React from 'react';
import './index.scss';

interface Props {
  className?: string;
  content: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
}

const button: React.FC<Props> = ({ className, content, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} className={`button button_theme_light ${className}`} disabled={disabled}>
      {content}
    </button>
  );
};

export const Button = button;
