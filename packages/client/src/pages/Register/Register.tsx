import React from 'react';

import './Register.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className={'register__wrapper'}>
      <div className={'register__content'}>
        <form className={'register__form'} action={''} method={'post'}>
          <p className={'register__title'}>Регистрация</p>
          <Input label={'Почта'} type={'text'} name={'email'} />
          <Input label={'Логин'} type={'text'} name={'login'} />
          <Input label={'Имя'} type={'text'} name={'first_name'} />
          <Input label={'Фамилия'} type={'text'} name={'second_name'} />
          <Input label={'Телефон'} type={'text'} name={'phone'} />
          <Input label={'Пароль'} type={'password'} name={'password'} />
          <Input label={'Пароль (ещё раз)'} type={'password'} />
          <div className={'register__buttons'}>
            <Button type={'submit'}>Зарегистрироваться</Button>
            <Link to={'/'}>
              <Button backgroundOpacity={true}>Войти</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
