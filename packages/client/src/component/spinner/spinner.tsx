import React, { ElementType, forwardRef } from 'react';
import classNames from 'classnames';

export interface SpinnerProps {
  className?: string;
  color?: string;
  component?: string | ElementType;
  size?: 'sm';
  variant?: 'border' | 'grow';
  visuallyHiddenLabel?: string;
}

type Ref = HTMLDivElement | HTMLSpanElement;

export const Spinner = forwardRef<Ref, SpinnerProps>(
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

Spinner.displayName = 'Spinner';
