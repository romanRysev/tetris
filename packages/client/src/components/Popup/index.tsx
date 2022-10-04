import React, { BaseSyntheticEvent, useState, useEffect, useCallback, FC } from 'react';

import { Button } from '../Button/Button';

import './style.scss';

type PopupProps = {
  onClick: (event: BaseSyntheticEvent) => void;
};

export const Popup: FC<PopupProps> = ({ onClick }) => {
  const [title, setTitle] = useState('Загрузите файл');
  const [labelText, setLabelText] = useState('Выбрать файл на компьютере');
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] = useState(false);
  const [labelClassName, setLabelClassName] = useState('popup__label_blue');

  useEffect(() => {
    const inputElem = document.querySelector('.popup__input') as Element;
    inputElem.addEventListener('change', function (this: HTMLInputElement) {
      // eslint-disable-next-line no-invalid-this
      const file: File | null = (this.files as FileList)[0];
      if (file) {
        setTitle('Файл загружен');
        setFile(file);
        setLabelText(file?.name);
        setLabelClassName('popup__label_grey');
        setValidation(false);
      }
    });
  }, []);

  const handleButtonSubmit = useCallback(() => {
    if (!file) {
      setValidation(true);
    } else {
      // send data
    }
  }, [file]);

  return (
    <div className="background-blur" onClick={onClick}>
      <div className="popup">
        <h3 className="popup__title">{title}</h3>
        <input type="file" id="popup__input" className="popup__input" />
        <label htmlFor="popup__input" className={`popup__label ${labelClassName}`}>
          {labelText}
        </label>

        <Button content="Поменять" onClick={handleButtonSubmit} className="popup__button" />

        {validation && <p className="popup__validation-text"> Нужно выбрать файл </p>}
      </div>
    </div>
  );
};
