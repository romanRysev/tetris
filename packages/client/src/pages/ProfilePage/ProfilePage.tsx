import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from '../../components/Link/Link';
import { Table, TableCell, TableRow } from '../../components/Table/Table';
import { ProfileLayout } from '../../components/ProfileLayout/ProfileLayout';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/actions/singActions';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

import './ProfilePage.scss';
import { sendThemeToDB, sendUserToDB } from '../../utils/backEndApi';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userProfile = useAppSelector((state) => state.auth.user);
  const userTheme = useAppSelector((state) => state.theme);
  const { login, email, phone, firstName, secondName: lastName, displayName } = userProfile;

  const onLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === 'fulfilled') {
      const { soundOn, musicOn, musicLevel, soundLevel, active } = userTheme;
      const { id } = userProfile;
      await sendUserToDB(userProfile);
      await sendThemeToDB({ soundOn, musicOn, musicLevel, soundLevel, themeActive: active, userID: id });
      navigate('/login');
    }
  };

  return (
    <StaticLayout>
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
    </StaticLayout>
  );
};

export default ProfilePage;
