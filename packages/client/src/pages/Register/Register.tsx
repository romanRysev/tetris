import React, { useState } from 'react';

import './Register.scss';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useAppDispatch } from '../../redux/hooks';
import { register } from '../../redux/actions/singActions';

const Register = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState('');

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  console.log(form);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(register(form));
    e.preventDefault();
  };

  return (
    <div className="register">
      <div className="register__content">
        <form className="register__form" onSubmit={onSubmit}>
          <p className="register__title">Регистрация</p>
          <Input label="Почта" type="text" name="email" onChange={onFieldChange} value={form.email} />
          <Input label="Логин" type="text" name="login" onChange={onFieldChange} value={form.login} />
          <Input label="Имя" type="text" name="first_name" onChange={onFieldChange} value={form.first_name} />
          <Input label="Фамилия" type="text" name="second_name" onChange={onFieldChange} value={form.second_name} />
          <Input label="Телефон" type="text" name="phone" onChange={onFieldChange} value={form.phone} />
          <Input label="Пароль" type="password" name="password" onChange={onFieldChange} value={form.password} />
          <div className="register__buttons">
            <Button>Зарегистрироваться</Button>
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
