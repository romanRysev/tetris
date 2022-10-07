import React from 'react';

import './Login.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className={'login__wrapper'}>
      <div className={'login__content'}>
        <form className={'login__form'} action={''} method={'get'}>
          <p className={'login__title'}>Вход</p>
          <Input label={'Логин'} type={'text'} name={'login'} />
          <Input label={'Пароль'} type={'password'} name={'password'} />
          <div className={'login__buttons'}>
            <Button type={'submit'}>Авторизоваться</Button>
            <Link to={'/register'}>
              <Button backgroundOpacity={true}>Нет аккаунта?</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
