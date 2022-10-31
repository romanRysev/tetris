import React, { BaseSyntheticEvent, FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { BackButton } from '../BackButton/BackButton';
import { AvatarLg } from '../AvatarLg/AvatarLg';
import { BackgroundBlur } from '../BackgroundBlur/BackgroundBlur';
import { Popup } from '../Popup/Popup';
import { setAvatar } from '../../redux/actions/profileActions';
import { filePrefix } from '../../consts/prefix';

import './ProfileLayout.scss';

interface ProfileLayoutProps extends PropsWithChildren {
  navBackPath?: string;
  className?: string;
}

export const ProfileLayout: FC<ProfileLayoutProps> = ({ children, navBackPath = '/', className }) => {
  const dispatch = useAppDispatch();
  const { avatar, display_name: displayName, first_name: firstName } = useAppSelector((state) => state.auth.user);
  const avatarPath = filePrefix + avatar;

  const [title, setTitle] = useState('Загрузите файл');
  const [labelText, setLabelText] = useState('Выбрать файл на компьютере');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [showValidation, setShowValidation] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const popupElem = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputElem = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleAvatarClick = useCallback(() => {
    setErrorMessage(false);
    setPopupVisible(true);
  }, []);

  const handleAvatarClose = useCallback(() => {
    setPopupVisible(false);
    setShowValidation(false);
    setFile(undefined);
    setLabelText('Выбрать файл на компьютере');
    setTitle('Загрузите файл');
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

  const handleScreenClick = useCallback(
    (event: BaseSyntheticEvent) => {
      const withinBoundaries = popupElem.current === event.target || popupElem.current.contains(event.target);
      if (!withinBoundaries) {
        handleAvatarClose();
      }
    },
    [handleAvatarClose],
  );

  const handleButtonSubmit = useCallback(() => {
    if (!file) {
      setShowValidation(true);
    } else {
      const formData = new FormData();
      formData.append('avatar', file);
      (async () => {
        const res = await dispatch(setAvatar(formData));
        if (res.meta.requestStatus === 'fulfilled') {
          handleAvatarClose();
        } else {
          setErrorMessage(true);
        }
      })();
    }
  }, [dispatch, file, handleAvatarClose]);

  return (
    <div className={classNames('profile-layout', className)}>
      <BackButton to={navBackPath} />
      <AvatarLg
        avatarPath={avatar ? avatarPath : ''}
        onClick={handleAvatarClick}
        name={displayName ? displayName : firstName}
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
            {errorMessage && <p className="profile-layout__error-message">Не удалось сохранить изменения</p>}
          </Popup>
        </BackgroundBlur>
      )}
      {children}
    </div>
  );
};
