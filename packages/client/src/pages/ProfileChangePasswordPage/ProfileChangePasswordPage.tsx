import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, TableCell, TableRow } from '../../components/Table/Table';
import { ProfileLayout } from '../../components/ProfileLayout/ProfileLayout';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import './ProfileChangePasswordPage.scss';

interface ProfileChangePasswordPageProps {
  profileData?: {
    avatarPath: string;
  };
}

const data = {
  avatarPath: '',
};

export const ProfileChangePasswordPage: FC<ProfileChangePasswordPageProps> = ({ profileData }) => {
  const navigate = useNavigate();
  profileData = data; // TODO: брать из стора

  const handleButtonSubmit = useCallback(() => {
    // TODO: отправить данные
    navigate('/profile');
  }, [navigate]);

  return (
    <ProfileLayout avatarPath={profileData.avatarPath} navBackPath="/profile" className="profile-change-password-page">
      <form onSubmit={handleButtonSubmit}>
        <Table className="profile-change-password-page__table">
          <TableRow>
            <TableCell> Старый пароль </TableCell>
            <TableCell>
              <Input type="password" className="profile-change-password-page__input" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Новый пароль </TableCell>
            <TableCell>
              <Input type="password" className="profile-change-password-page__input" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Повторите новый пароль </TableCell>
            <TableCell>
              <Input type="password" className="profile-change-password-page__input" />
            </TableCell>
          </TableRow>
        </Table>
        <Button className="profile-change-password-page__button" type="submit">
          Сохранить
        </Button>
      </form>
    </ProfileLayout>
  );
};

export default ProfileChangePasswordPage;
