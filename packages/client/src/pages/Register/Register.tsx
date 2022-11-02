import React, { useState } from 'react';

import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { register } from '../../redux/actions/singActions';
import {
  comparePasswordsRules,
  emailRule,
  loginRule,
  nameRule,
  passwordRule,
  phoneRule,
  requiredRule,
  validation,
} from '../../helpers/validator';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import classNames from 'classnames';

export type RegisterForm = {
  login: string;
  password: string;
  email: string;
  firstName: string;
  secondName: string;
  phone: string;
};

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    login: '',
    password: '',
    email: '',
    firstName: '',
    secondName: '',
    phone: '',
  });

  const [errorEmail, setErrorEmail] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorSecondName, setErrorSecondName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorSecondPassword, setErrorSecondPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [passwordsCompareError, setPasswordsCompareError] = useState('');
  const [formError, setFormError] = useState('');

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(register(form));

    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/game');
    } else {
      setFormError(`Ошибка регистрации. ${(res.payload as Error)?.message}`);
    }
  };

  const onSecondPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value);
  };

  const checkEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorEmail(validation(e.target.value, [emailRule, requiredRule]).errorMessages.join('\n') ?? '');
  };

  const checkLogin = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorLogin(validation(e.target.value, [loginRule, requiredRule]).errorMessages.join('\n') ?? '');
  };

  const checkFirstName = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorFirstName(validation(e.target.value, [nameRule, requiredRule]).errorMessages.join('\n') ?? '');
  };

  const checkSecondName = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorSecondName(validation(e.target.value, [nameRule, requiredRule]).errorMessages.join('\n') ?? '');
  };

  const checkPhone = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorPhone(validation(e.target.value, [phoneRule, requiredRule]).errorMessages.join('\n') ?? '');
  };

  const checkPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorPassword(validation(e.target.value, [passwordRule, requiredRule]).errorMessages.join('\n') ?? '');
    setPasswordsCompareError(
      validation(e.target.value, [comparePasswordsRules(form.password, secondPassword)]).errorMessages.join('\n') ?? '',
    );
  };

  const checkSecondPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorSecondPassword(validation(e.target.value, [passwordRule, requiredRule]).errorMessages.join('\n') ?? '');
    setPasswordsCompareError(
      validation(e.target.value, [comparePasswordsRules(form.password, secondPassword)]).errorMessages.join('\n') ?? '',
    );
  };

  const checkError = !!(
    errorEmail ||
    errorLogin ||
    errorFirstName ||
    errorSecondName ||
    errorPhone ||
    errorPassword ||
    errorSecondPassword ||
    passwordsCompareError
  );

  return (
    <div className="register">
      <div className="register__content">
        <form className="register__form" onSubmit={onSubmit}>
          <p className="register__title">Регистрация</p>
          <Input
            label="Почта*"
            type="text"
            name="email"
            onChange={onFieldChange}
            onBlur={checkEmail}
            errorText={errorEmail}
          />
          <Input
            label="Логин*"
            type="text"
            name="login"
            onChange={onFieldChange}
            onBlur={checkLogin}
            errorText={errorLogin}
          />
          <Input
            label="Имя*"
            type="text"
            name="first_name"
            onChange={onFieldChange}
            onBlur={checkFirstName}
            errorText={errorFirstName}
          />
          <Input
            label="Фамилия*"
            type="text"
            name="second_name"
            onChange={onFieldChange}
            onBlur={checkSecondName}
            errorText={errorSecondName}
          />
          <Input
            label="Телефон*"
            type="text"
            name="phone"
            onChange={onFieldChange}
            onBlur={checkPhone}
            errorText={errorPhone}
          />
          <Input
            label="Пароль*"
            type="password"
            name="password"
            onChange={onFieldChange}
            onBlur={checkPassword}
            errorText={errorPassword}
          />
          <Input
            label="Пароль еще раз*"
            type="password"
            name="second_password"
            onChange={onSecondPasswordChange}
            onBlur={checkSecondPassword}
            errorText={errorSecondPassword}
          />
          <p className="register__form-error">{passwordsCompareError}</p>
          <p className="register__form-error">{formError}</p>
          <Button
            className={classNames('register__button', { register__button_disabled: checkError })}
            disabled={checkError}
          >
            Зарегистрироваться
          </Button>
        </form>
        <Link to="/login">
          <Button backgroundOpacity={true}>Войти</Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
