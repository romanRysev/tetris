import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from '../../components/Link/Link';
import { Table, TableCell, TableRow } from '../../components/Table/Table';
import { ProfileLayout } from '../../components/ProfileLayout/ProfileLayout';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/actions/singActions';

import './ProfilePage.scss';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    login,
    email,
    phone,
    first_name: firstName,
    second_name: lastName,
    display_name: displayName,
  } = useAppSelector((state) => state.auth.user);

  const onLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <ProfileLayout className="profile-page">
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
            <p className="link link_red" onClick={onLogout}>
              Выйти
            </p>
          </TableCell>
        </TableRow>
      </Table>
    </ProfileLayout>
  );
};

export default ProfilePage;
