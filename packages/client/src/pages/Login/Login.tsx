import React, { useState } from 'react';

import './Login.scss';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { checkLogin, login } from '../../redux/actions/singActions';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { loginRule, passwordRule, validation } from '../../helpers/validator';
import classNames from 'classnames';
import { Link } from '../../components/Link/Link';
import { setTheme } from '../../redux/actions/themeActions';
import { UpperMenuGuest } from '../../components/UpperMenu/_guest/UpperMenuGuest';
import { getServiceId } from '../../utils/api';
import { REDIRECT_URI } from '../../utils/constants';

export type LoginForm = {
  login: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<LoginForm>({ login: '', password: '' });
  const [errorLogin, setErrorLogin] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.meta.requestStatus === 'fulfilled') {
      await dispatch(checkLogin());
      await dispatch(setTheme());
      navigate('/game');
    } else {
      setFormError(`Ошибка входа. ${(res.payload as Error)?.message}`);
    }
  };

  const checkLogins = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorLogin(validation(e.target.value, [loginRule]).errorMessages[0] ?? '');
  };

  const checkPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorPassword(validation(e.target.value, [passwordRule]).errorMessages[0] ?? '');
  };

  const onYandexClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await getServiceId(REDIRECT_URI);
    const id = await res.json();
    window.open(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${id.service_id}&redirect_uri=${REDIRECT_URI}`,
      '_self',
    );
  };

  const checkError = errorLogin ? true : !!errorPassword;

  return (
    <>
      <UpperMenuGuest />
      <div className="login">
        <div className="login__content">
          <form className="login__form" onSubmit={onSubmit}>
            <p className="login__title">Вход</p>
            <Input
              label="Логин"
              type="text"
              name="login"
              onChange={onFieldChange}
              onBlur={checkLogins}
              errorText={errorLogin}
            />
            <Input
              label="Пароль"
              type="password"
              name="password"
              onChange={onFieldChange}
              onBlur={checkPassword}
              errorText={errorPassword}
            />
            <div className="login__buttons">
              <p className="login__form-error">{formError}</p>
              <Button
                className={classNames('login__button', { login__button_disabled: checkError })}
                disabled={checkError}
              >
                Авторизоваться
              </Button>
              <Button onClick={onYandexClick}>Войти через Яндекс</Button>
              <Link to="/register">
                <Button backgroundOpacity={true}>Нет аккаунта?</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
