import React, { FC } from 'react';

import { Link } from '../../components/Link/Link';
import { Table, TableCell, TableRow } from '../../components/Table/Table';
import { ProfileLayout } from '../../components/ProfileLayout/ProfileLayout';

import './ProfilePage.scss';

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

export const ProfilePage: FC<ProfilePageProps> = ({ profileData }) => {
  profileData = data; // TODO: брать из стора
  const { firstName, lastName, login, email, phone, displayName, avatarPath } = profileData;

  return (
    <ProfileLayout firstName={firstName} avatarPath={avatarPath} className="profile-page">
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
            <Link to="/profile/change-info" color="blue">
              Изменить данные
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Link to="/profile/change-password" color="blue">
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
    </ProfileLayout>
  );
};

export default ProfilePage;
