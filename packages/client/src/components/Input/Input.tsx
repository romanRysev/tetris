import React from 'react';
import './index.scss';

interface Props {
  className?: string;
  value?: string | undefined;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  errorText?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const input: React.FC<Props> = ({
  className = '',
  disabled,
  value,
  type,
  placeholder,
  label,
  errorText,
  onChange,
  onBlur,
}) => {
  return (
    <div className="input">
      <label className="input__label">
        <span className="input__title">{label}</span>
        <input
          className={`input__field input__field_theme_light ${className}`}
          value={value}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span className="input__error">{errorText}</span>
      </label>
    </div>
  );
};

export const Input = input;
