import React, { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, TableCell, TableRow } from '../../components/Table/Table';
import { ProfileLayout } from '../../components/ProfileLayout/ProfileLayout';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import './ProfileChangeInfoPage.scss';

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

const data = {
  firstName: 'Иван',
  lastName: 'Иванов',
  login: 'ivanivanov',
  email: 'pochta@yandex.ru',
  phone: '+7 (909) 967 30 30 ',
  displayName: 'Иван',
  avatarPath: '',
};

export const ProfileChangeInfoPage: FC<ProfilePageProps> = ({ profileData }) => {
  const navigate = useNavigate();

  profileData = data; // TODO: брать из стора
  const { avatarPath } = profileData;
  const [email, setEmail] = useState(profileData.email);
  const [login, setLogin] = useState(profileData.login);
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const [phone, setPhone] = useState(profileData.phone);
  const [displayName, setDisplayName] = useState(profileData.displayName);

  const handleButtonSubmit = useCallback(() => {
    // TODO: отправить данные
    navigate('/profile');
  }, [navigate]);

  return (
    <ProfileLayout avatarPath={avatarPath} navBackPath="/profile" className="profile-change-info-page">
      <form onSubmit={handleButtonSubmit}>
        <Table className="profile-change-info-page__table">
          <TableRow>
            <TableCell> Почта </TableCell>
            <TableCell>
              <Input
                value={email}
                className="profile-change-info-page__input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Логин </TableCell>
            <TableCell>
              <Input
                value={login}
                className="profile-change-info-page__input"
                onChange={(e) => setLogin(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Имя </TableCell>
            <TableCell>
              <Input
                value={firstName}
                className="profile-change-info-page__input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Фамилия </TableCell>
            <TableCell>
              <Input
                value={lastName}
                className="profile-change-info-page__input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Имя в чате </TableCell>
            <TableCell>
              <Input
                value={displayName}
                className="profile-change-info-page__input"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Телефон </TableCell>
            <TableCell>
              <Input
                value={phone}
                className="profile-change-info-page__input"
                onChange={(e) => setPhone(e.target.value)}
              />
            </TableCell>
          </TableRow>
        </Table>
        <Button type="submit" className="profile-change-info-page__button">
          Сохранить
        </Button>
      </form>
    </ProfileLayout>
  );
};

export default ProfileChangeInfoPage;
