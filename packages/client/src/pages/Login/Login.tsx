import React, { useState } from 'react';

import './Login.scss';

import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/actions/singActions';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { valid, validationRules } from '../../helpers/validator';

const Login = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, type, cheked } = e.target;
    const value = type === 'checkbox' ? cheked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (e) => {
    dispatch(login(form));
    e.preventDefault();
  };

  const checkLogin = (e) => {
    valid(e, validationRules.login, setErrorLogin);
  };

  const checkPassword = (e) => {
    valid(e, validationRules.password, setErrorPassword);
  };

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
            value={form.login}
            onBlur={checkLogin}
            errorText={errorLogin && 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание'}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            onChange={onFieldChange}
            value={form.password}
            onBlur={checkPassword}
            errorText={
              errorPassword && 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква, цифра и спецсимвол'
            }
          />
          <div className="login__buttons">
            <Button>Авторизоваться</Button>
          </div>
        </form>
        <Link to="/register">
          <Button backgroundOpacity={true}>Нет аккаунта?</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
