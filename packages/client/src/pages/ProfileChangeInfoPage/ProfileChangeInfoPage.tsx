import React, { BaseSyntheticEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Table, TableCell, TableRow } from '../../components/Table/Table';
import { ProfileLayout } from '../../components/ProfileLayout/ProfileLayout';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setProfileInfo } from '../../redux/actions/profileActions';
import { loginRule, requiredRule, validation } from '../../helpers/validator';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

import './ProfileChangeInfoPage.scss';

export const ProfileChangeInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState(user.email);
  const [login, setLogin] = useState(user.login);
  const [firstName, setFirstName] = useState(user.firstName);
  const [secondName, setSecondName] = useState(user.secondName);
  const [phone, setPhone] = useState(user.phone);
  const [displayName, setDisplayName] = useState(user.displayName || '');

  const [errorLogin, setErrorLogin] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorSecondName, setErrorSecondName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');

  const [errorMessage, setErrorMessage] = useState(false);

  const isInvalid = !!(errorLogin || errorEmail || errorFirstName || errorSecondName || errorPhone);

  const handleButtonSubmit = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault();
      const reqBody = {
        email,
        login,
        first_name: firstName,
        second_name: secondName,
        phone,
        display_name: displayName,
      };

      (async () => {
        const res = await dispatch(setProfileInfo(reqBody));
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/profile');
        } else {
          setErrorMessage(true);
        }
      })();
    },
    [email, login, firstName, secondName, phone, displayName, dispatch, navigate],
  );

  return (
    <StaticLayout>
      <ProfileLayout navBackPath="/profile" className="profile-change-info-page">
        <form onSubmit={handleButtonSubmit}>
          <Table className="profile-change-info-page__table">
            <TableRow>
              <TableCell> Почта </TableCell>
              <TableCell>
                <Input
                  value={email}
                  className="profile-change-info-page__input"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setErrorEmail(validation(email, [loginRule, requiredRule]).errorMessages.join('\n') ?? '')
                  }
                  errorText={errorEmail}
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
                  onBlur={() =>
                    setErrorLogin(validation(login, [loginRule, requiredRule]).errorMessages.join('\n') ?? '')
                  }
                  errorText={errorLogin}
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
                  onBlur={() =>
                    setErrorFirstName(validation(firstName, [loginRule, requiredRule]).errorMessages.join('\n') ?? '')
                  }
                  errorText={errorFirstName}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Фамилия </TableCell>
              <TableCell>
                <Input
                  value={secondName}
                  className="profile-change-info-page__input"
                  onChange={(e) => setSecondName(e.target.value)}
                  onBlur={() =>
                    setErrorSecondName(validation(secondName, [loginRule, requiredRule]).errorMessages.join('\n') ?? '')
                  }
                  errorText={errorSecondName}
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
                  errorText={errorFirstName}
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
                  onBlur={() =>
                    setErrorPhone(validation(phone, [loginRule, requiredRule]).errorMessages.join('\n') ?? '')
                  }
                  errorText={errorPhone}
                />
              </TableCell>
            </TableRow>
          </Table>
          <p className="profile-change-info-page__error-message">{errorMessage && 'Не удалось сохранить изменения'}</p>
          <Button
            type="submit"
            className={classNames('profile-change-info-page__button', {
              'profile-change-info-page__button_disabled': isInvalid,
            })}
            disabled={isInvalid}
          >
            Сохранить
          </Button>
        </form>
      </ProfileLayout>
    </StaticLayout>
  );
};

export default ProfileChangeInfoPage;
