import React, { BaseSyntheticEvent, useCallback, useState, FC, useRef, useEffect } from 'react';
import classNames from 'classnames';

import { AvatarLg } from '../../components/AvatarLg/AvatarLg';
import { Popup } from '../../components/Popup/Popup';
import { BackgroundBlur } from '../../components/BackgroundBlur/BackgroundBlur';

import './Profile.scss';
import { Link } from '../../components/Link/Link';
import { Table, TableCell, TableRow } from '../../components/Table/Table';
import { BackButton } from '../../components/BackButton/BackButton';

interface ProfilePageProps {
  profileData?: {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    phone: string;
    displayName: string;
    avatarPath: string;
  };
}

// TODO: брать из стора
const data = {
  firstName: 'Иван',
  lastName: 'Иванов',
  login: 'ivanivanov',
  email: 'pochta@yandex.ru',
  phone: '+7 (909) 967 30 30 ',
  displayName: 'Иван',
  avatarPath: '',
};

export const Profile: FC<ProfilePageProps> = ({ profileData }) => {
  profileData = data; // TODO: брать из стора
  const { firstName, lastName, login, email, phone, displayName, avatarPath } = profileData;
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
      <BackButton to="/" />
      <AvatarLg avatarPath={avatarPath} onClick={handleAvatarClick} name={firstName} className="profile-page__avatar" />
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

      <Table className="profile-page__table">
        <TableRow>
          <TableCell> Почта </TableCell>
          <TableCell> {email} </TableCell>
        </TableRow>
        <TableRow>
          <TableCell> Логин </TableCell>
          <TableCell> {login} </TableCell>
        </TableRow>
        <TableRow>
          <TableCell> Имя </TableCell>
          <TableCell>{firstName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell> Фамилия </TableCell>
          <TableCell> {lastName} </TableCell>
        </TableRow>
        <TableRow>
          <TableCell> Имя в чате </TableCell>
          <TableCell> {displayName} </TableCell>
        </TableRow>
        <TableRow>
          <TableCell> Телефон </TableCell>
          <TableCell> {phone} </TableCell>
        </TableRow>
      </Table>

      <Table className="profile-page__table">
        <TableRow>
          <TableCell>
            <Link to="/" color="blue">
              Изменить данные
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Link to="/" color="blue">
              Изменить пароль
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Link to="/" color="red">
              Выйти
            </Link>
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default Profile;
