import React, { useState } from 'react';

import './Login.scss';

import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/actions/singActions';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

const Login = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState('');

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, type, cheked } = e.target;
    const value = type === 'checkbox' ? cheked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (e) => {
    dispatch(login(form));
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="login__content">
        <form className="login__form" onSubmit={onSubmit}>
          <p className="login__title">Вход</p>
          <Input label="Логин" type="text" name="login" onChange={onFieldChange} value={form.login} />
          <Input label="Пароль" type="password" name="password" onChange={onFieldChange} value={form.password} />
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
