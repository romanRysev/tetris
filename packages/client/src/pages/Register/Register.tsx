import React, { useState } from 'react';

import './Register.scss';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useAppDispatch } from '../../redux/hooks';
import { register } from '../../redux/actions/singActions';
import {
  validEmail,
  validFirstName,
  validLogin,
  validPassword,
  validPhone,
  validSecondName,
  validSecondPassword,
} from '../../helpers/validator';

const Register = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorSecondName, setErrorSecondName] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorSecondPassword, setErrorSecondPassword] = useState(false);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(register(form));
    e.preventDefault();
  };

  const checkEmail = (e) => {
    validEmail(e, setErrorEmail);
  };

  const checkLogin = (e) => {
    validLogin(e, setErrorLogin);
  };

  const checkFirstName = (e) => {
    validFirstName(e, setErrorFirstName);
  };

  const checkSecondName = (e) => {
    validSecondName(e, setErrorSecondName);
  };

  const checkPhone = (e) => {
    validPhone(e, setErrorPhone);
  };

  const checkPassword = (e) => {
    validPassword(e, setErrorPassword);
  };

  const checkSecordPassword = (e) => {
    validSecondPassword(e.target.value, form?.password, secondPassword, setErrorSecondPassword);
  };

  const checkError = !errorEmail
    ? true
    : !errorLogin
    ? true
    : !errorFirstName
    ? true
    : !errorSecondName
    ? true
    : !errorPhone
    ? true
    : !errorPassword
    ? true
    : !errorSecondPassword;

  return (
    <div className="register">
      <div className="register__content">
        <form className="register__form" onSubmit={onSubmit}>
          <p className="register__title">Регистрация</p>
          <Input
            label="Почта"
            type="text"
            name="email"
            onChange={onFieldChange}
            value={form.email}
            onBlur={checkEmail}
            errorText={!errorEmail && 'латиница, цифры и спецсимволы'}
          />
          <Input
            label="Логин"
            type="text"
            name="login"
            onChange={onFieldChange}
            value={form.login}
            onBlur={checkLogin}
            errorText={!errorLogin && 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание'}
          />
          <Input
            label="Имя"
            type="text"
            name="first_name"
            onChange={onFieldChange}
            value={form.first_name}
            onBlur={checkFirstName}
            errorText={
              !errorFirstName && 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'
            }
          />
          <Input
            label="Фамилия"
            type="text"
            name="second_name"
            onChange={onFieldChange}
            value={form.second_name}
            onBlur={checkSecondName}
            errorText={
              !errorSecondName && 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'
            }
          />
          <Input
            label="Телефон"
            type="text"
            name="phone"
            onChange={onFieldChange}
            value={form.phone}
            onBlur={checkPhone}
            errorText={!errorPhone && 'от 10 до 15 символов, состоит из цифр, может начинается с плюса'}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            onChange={onFieldChange}
            value={form.password}
            onBlur={checkPassword}
            errorText={!errorPassword && 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'}
          />
          <Input
            label="Пароль еще раз"
            type="password"
            name="second_password"
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
            onBlur={checkSecordPassword}
            errorText={!errorSecondPassword && 'пароли не совпадают'}
          />
          <div className="register__buttons" style={checkError ? { cursor: 'not-allowed' } : null}>
            <Button style={checkError ? { backgroundColor: '#a51212', pointerEvents: 'none' } : null}>
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <Link to="/">
          <Button backgroundOpacity={true}>Войти</Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
