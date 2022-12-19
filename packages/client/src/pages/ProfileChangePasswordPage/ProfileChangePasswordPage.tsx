import React, { BaseSyntheticEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Table, TableCell, TableRow } from '../../components/Table/Table';
import { ProfileLayout } from '../../components/ProfileLayout/ProfileLayout';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { setProfilePassword } from '../../redux/actions/profileActions';
import { useAppDispatch } from '../../redux/hooks';
import { comparePasswordsRules, passwordRule, requiredRule, validation } from '../../helpers/validator';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

import './ProfileChangePasswordPage.scss';

export const ProfileChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errorOldPassword, setErrorOldPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [passwordsCompareError, setPasswordsCompareError] = useState('');

  const [errorMessage, setErrorMessage] = useState(false);

  const isInvalid = !!(errorOldPassword || errorNewPassword || passwordsCompareError);

  const handleButtonSubmit = useCallback(
    (e: BaseSyntheticEvent) => {
      setErrorMessage(false);
      e.preventDefault();
      const reqBody = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      (async () => {
        const res = await dispatch(setProfilePassword(reqBody));
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/profile');
        } else {
          setErrorMessage(true);
          setTimeout(() => setErrorMessage(false), 5000);
        }
      })();
    },
    [oldPassword, newPassword, dispatch, navigate],
  );

  return (
    <StaticLayout>
      <ProfileLayout navBackPath="/profile" className="profile-change-password-page">
        <form onSubmit={handleButtonSubmit}>
          <Table className="profile-change-password-page__table">
            <TableRow>
              <label className="profile-change-password-page__label">
                <TableCell> Старый пароль </TableCell>
                <TableCell>
                  <Input
                    value={oldPassword}
                    type="password"
                    className="profile-change-password-page__input"
                    onChange={(e) => setOldPassword(e.target.value)}
                    onBlur={() => {
                      setErrorOldPassword(
                        validation(oldPassword, [passwordRule, requiredRule]).errorMessages.join('\n') ?? '',
                      );
                    }}
                    errorText={errorOldPassword}
                  />
                </TableCell>
              </label>
            </TableRow>
            <TableRow>
              <label className="profile-change-password-page__label">
                <TableCell> Новый пароль </TableCell>
                <TableCell>
                  <Input
                    value={newPassword}
                    type="password"
                    className="profile-change-password-page__input"
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() => {
                      setErrorNewPassword(
                        validation(newPassword, [passwordRule, requiredRule]).errorMessages.join('-') ?? '',
                      );
                    }}
                    errorText={errorNewPassword}
                  />
                </TableCell>
              </label>
            </TableRow>
            <TableRow>
              <label className="profile-change-password-page__label">
                <TableCell> Повторите новый пароль </TableCell>
                <TableCell>
                  <Input
                    value={repeatPassword}
                    type="password"
                    className="profile-change-password-page__input"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    onBlur={() => {
                      setPasswordsCompareError(
                        validation(repeatPassword, [
                          requiredRule,
                          comparePasswordsRules(newPassword, repeatPassword),
                        ]).errorMessages.join('\n') ?? '',
                      );
                    }}
                    errorText={passwordsCompareError}
                  />
                </TableCell>
              </label>
            </TableRow>
          </Table>
          <p className="profile-change-password-page__error-message">
            {errorMessage && 'Не удалось сохранить изменения'}
          </p>
          <Button
            className={classNames('profile-change-password-page__button', {
              'profile-change-password-page__button_disabled': isInvalid,
            })}
            type="submit"
            disabled={isInvalid}
          >
            Сохранить
          </Button>
        </form>
      </ProfileLayout>
    </StaticLayout>
  );
};

export default ProfileChangePasswordPage;
