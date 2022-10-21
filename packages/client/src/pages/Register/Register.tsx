import React, { useState } from 'react';

import './Register.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { register } from '../../redux/actions/singActions';
import {
  loginRule,
  nameRule,
  passwordRule,
  phoneRule,
  valid,
  validation,
  validationRules,
} from '../../helpers/validator';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

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
    e.preventDefault();
    const res = dispatch(register(form));

    if (res.payload.ok) {
      navigate('/');
    }
  };

  const checkEmail = (e) => {
    valid(e, validationRules.email, setErrorEmail);
  };

  const checkLogin = (e) => {
    // Можно также использовать validation(e, [rule1, rule2]).errorMessages для отображения ошибок переданных правил валидации
    // Правил можно в одно поле передать несколько => ошибок тоже может быть больше одной...
    setErrorLogin(validation(e, [loginRule]).isValid);
  };

  const checkFirstName = (e) => {
    setErrorFirstName(validation(e, [nameRule]).isValid);
  };

  const checkSecondName = (e) => {
    setErrorSecondName(validation(e, [nameRule]).isValid);
  };

  const checkPhone = (e) => {
    setErrorPhone(validation(e, [phoneRule]).isValid);
  };

  const checkPassword = (e) => {
    setErrorPassword(validation(e, [passwordRule]).isValid);
  };

  const checkSecordPassword = (e) => {
    setErrorSecondPassword(validation(e, [passwordRule]).isValid);
  };

  const checkError = errorEmail
    ? true
    : errorLogin
    ? true
    : errorFirstName
    ? true
    : errorSecondName
    ? true
    : errorPhone
    ? true
    : errorPassword
    ? true
    : errorSecondPassword;

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
            onBlur={checkEmail}
            errorText={errorEmail && 'латиница, цифры и спецсимволы'}
          />
          <Input
            label="Логин"
            type="text"
            name="login"
            onChange={onFieldChange}
            onBlur={checkLogin}
            errorText={errorLogin && 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание'}
          />
          <Input
            label="Имя"
            type="text"
            name="first_name"
            onChange={onFieldChange}
            onBlur={checkFirstName}
            errorText={
              errorFirstName && 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'
            }
          />
          <Input
            label="Фамилия"
            type="text"
            name="second_name"
            onChange={onFieldChange}
            onBlur={checkSecondName}
            errorText={
              errorSecondName && 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'
            }
          />
          <Input
            label="Телефон"
            type="text"
            name="phone"
            onChange={onFieldChange}
            onBlur={checkPhone}
            errorText={errorPhone && 'от 10 до 15 символов, состоит из цифр, может начинается с плюса'}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            onChange={onFieldChange}
            onBlur={checkPassword}
            errorText={
              errorPassword && 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква, цифра и спецсимвол'
            }
          />
          <Input
            label="Пароль еще раз"
            type="password"
            name="second_password"
            onChange={(e) => setSecondPassword(e.target.value)}
            onBlur={checkSecordPassword}
            errorText={errorSecondPassword && 'пароли не совпадают'}
          />
          <div className="register__buttons" style={checkError ? { cursor: 'not-allowed' } : null}>
            <Button style={checkError ? { backgroundColor: '#a51212', pointerEvents: 'none' } : null}>
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <Link to="/login">
          <Button backgroundOpacity={true}>Войти</Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
