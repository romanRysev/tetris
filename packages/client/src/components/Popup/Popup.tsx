import React, { FC } from 'react';
import { Button } from '../Button/Button';
import classNames from 'classnames';

import './popup.scss';

type PopupProps = {
  popupRef: React.MutableRefObject<HTMLInputElement>;
  title: string;
  buttonText: string;
  onClick: () => void;
  children?: React.ReactNode | string;
  showValidation: boolean;
  validationText: string;
  className?: string;
};

export const Popup: FC<PopupProps> = ({
  popupRef,
  title,
  buttonText,
  onClick,
  children,
  showValidation,
  validationText,
  className,
}) => {
  return (
    <div ref={popupRef} className={classNames('popup', className)}>
      <h3 className="popup__title">{title}</h3>
      {children}
      <Button onClick={onClick} className="popup__button">
        {buttonText}
      </Button>
      {showValidation && <p className="popup__validation-text"> {validationText} </p>}
    </div>
  );
};
