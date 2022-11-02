import React, { forwardRef, PropsWithChildren } from 'react';
import { Button } from '../Button/Button';
import classNames from 'classnames';

import './Popup.scss';

interface PopupProps extends PropsWithChildren {
  title: string;
  buttonText: string;
  onClick: () => void;
  showValidation: boolean;
  validationText: string;
  className?: string;
}

export const Popup = forwardRef<HTMLInputElement, PopupProps>(function Popup(
  { title, buttonText, onClick, children, showValidation, validationText, className },
  ref,
) {
  return (
    <div ref={ref} className={classNames('popup', className)}>
      <h3 className="popup__title">{title}</h3>
      {children}
      <Button onClick={onClick} className="popup__button">
        {buttonText}
      </Button>
      {showValidation && <p className="popup__validation-text"> {validationText} </p>}
    </div>
  );
});
