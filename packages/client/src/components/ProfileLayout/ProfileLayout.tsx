import React, { BaseSyntheticEvent, FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { BackButton } from '../BackButton/BackButton';
import { AvatarLg } from '../AvatarLg/AvatarLg';
import { BackgroundBlur } from '../BackgroundBlur/BackgroundBlur';
import { Popup } from '../Popup/Popup';

import './ProfileLayout.scss';

interface ProfileLayoutProps extends PropsWithChildren {
  firstName?: string;
  avatarPath?: string;
  navBackPath?: string;
  className?: string;
}

export const ProfileLayout: FC<ProfileLayoutProps> = ({
  children,
  firstName,
  avatarPath,
  navBackPath = '/',
  className,
}) => {
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
    inputElem.current?.addEventListener('change', (event) => {
      const file: File | null = ((event.currentTarget as HTMLInputElement).files as FileList)[0];
      if (file) {
        setTitle('Файл загружен');
        setFile(file);
        setLabelText(file?.name);
        setShowValidation(false);
      }
    });
  }, [popupVisible]);

  const handleScreenClick = useCallback((event: BaseSyntheticEvent) => {
    const withinBoundaries = popupElem.current === event.target || popupElem.current.contains(event.target);

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
    <div className={classNames('profile-layout', className)}>
      <BackButton to={navBackPath} />
      <AvatarLg
        avatarPath={avatarPath}
        onClick={handleAvatarClick}
        name={firstName}
        className="profile-layout__avatar"
      />

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
            <label
              className={classNames(
                file ? 'profile-layout__label_grey' : 'profile-layout__label_blue',
                'profile-layout__label',
              )}
            >
              <input ref={inputElem} type="file" className="profile-layout__input_file" />
              {labelText}
            </label>
          </Popup>
        </BackgroundBlur>
      )}

      {children}
    </div>
  );
};
