import React from 'react';
import classNames from 'classnames';
import './input.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
}

export function Input(props: Props) {
  const { label, errorText, ...inputProps } = props;
  const { className, disabled, value, type, placeholder, onChange, onBlur } = inputProps;
  return (
    <div className="input">
      <label className="input__label">
        <span className="input__title">{label}</span>
        <input
          className={classNames('input__field', 'input__field_theme_light', className)}
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
}
