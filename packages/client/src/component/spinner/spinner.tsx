import React, { ElementType, forwardRef, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  className?: string;
  color?: string;
  component?: string | ElementType;
  size?: 'sm';
  variant?: 'border' | 'grow';
  visuallyHiddenLabel?: string;
}

export const Spinner = forwardRef<HTMLDivElement | HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      color,
      component: Component = 'div',
      size,
      variant = 'border',
      visuallyHiddenLabel = 'Loading...',
      ...rest
    },
    ref,
  ) => {
    const _className = classNames(
      `spinner-${variant}`,
      `text-${color}`,
      size && `spinner-${variant}-${size}`,
      className,
    );

    return (
      <Component className={_className} role="status" {...rest} ref={ref}>
        <span className="visually-hidden">{visuallyHiddenLabel}</span>
      </Component>
    );
  },
);

Spinner.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  component: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  variant: PropTypes.oneOf(['border', 'grow']),
  visuallyHiddenLabel: PropTypes.string,
};

Spinner.displayName = 'Spinner';
