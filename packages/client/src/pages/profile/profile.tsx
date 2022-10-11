import React, { BaseSyntheticEvent, useCallback, useState, FC, useRef, useEffect } from 'react';
import classNames from 'classnames';

import { Avatar } from '../../components/Avatar/Avatar';
import { Popup } from '../../components/Popup/Popup';
import { BackgroundBlur } from '../../components/BackgroundBlur/BackgroundBlur';

import './profile.scss';

export const ProfilePage: FC = () => {
  const [title, setTitle] = useState('Загрузите файл');
  const [labelText, setLabelText] = useState('Выбрать файл на компьютере');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [showValidation, setShowValidation] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const popupElem = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputElem = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleAvatarClick = useCallback(() => {
    setPopupVisible(true);
  }, []);

  useEffect(() => {
    if (inputElem.current) {
      inputElem.current.addEventListener('change', (event) => {
        const file: File | null = ((event.currentTarget as HTMLInputElement).files as FileList)[0];
        if (file) {
          setTitle('Файл загружен');
          setFile(file);
          setLabelText(file?.name);
          setShowValidation(false);
        }
      });
    }
  }, [popupVisible]);

  const handleScreenClick = useCallback((event: BaseSyntheticEvent) => {
    const withinBoundaries = (event.nativeEvent as Record<string, HTMLInputElement[]>).path.includes(popupElem.current);

    if (!withinBoundaries) {
      setPopupVisible(false);
      setShowValidation(false);
      setFile(undefined);
      setLabelText('Выбрать файл на компьютере');
      setTitle('Загрузите файл');
    }
  }, []);

  const handleButtonSubmit = useCallback(() => {
    if (!file) {
      setShowValidation(true);
    } else {
      // send data
    }
  }, [file]);

  return (
    <div className="profile-page">
      <Avatar avatarPath="" onClick={handleAvatarClick} />
      {popupVisible && (
        <BackgroundBlur onClick={handleScreenClick}>
          <Popup
            popupRef={popupElem}
            onClick={handleButtonSubmit}
            title={title}
            buttonText="Поменять"
            showValidation={showValidation}
            validationText="Нужно выбрать файл"
          >
            <input ref={inputElem} type="file" id="popup__input" className="popup__input" />
            <label
              htmlFor="popup__input"
              className={classNames(file ? 'popup__label_grey' : 'popup__label_blue', 'popup__label')}
            >
              {labelText}
            </label>
          </Popup>
        </BackgroundBlur>
      )}
    </div>
  );
};
