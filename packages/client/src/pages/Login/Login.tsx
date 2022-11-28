import React, { useState } from 'react';

import './Login.scss';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/actions/singActions';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { loginRule, passwordRule, validation } from '../../helpers/validator';
import classNames from 'classnames';
import { Link } from '../../components/Link/Link';

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
      navigate('/game');
    } else {
      setFormError(`Ошибка входа. ${(res.payload as Error)?.message}`);
    }
  };

  const checkLogin = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorLogin(validation(e.target.value, [loginRule]).errorMessages[0] ?? '');
  };

  const checkPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorPassword(validation(e.target.value, [passwordRule]).errorMessages[0] ?? '');
  };

  const checkError = errorLogin ? true : !!errorPassword;

  return (
    <div className="login">
      <div className="login__content">
        <form className="login__form" onSubmit={onSubmit}>
          <p className="login__title">Вход</p>
          <Input
            label="Логин"
            type="text"
            name="login"
            onChange={onFieldChange}
            onBlur={checkLogin}
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
            <Link to="/register">
              <Button backgroundOpacity={true}>Нет аккаунта?</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
