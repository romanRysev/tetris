import { LoginForm } from '../pages/Login/Login';
import { RegisterForm } from '../pages/Register/Register';
import { APIurls } from './constants';

const headers = {
  post: { 'Content-Type': 'application/json' },
  get: { 'Content-Type': 'application/json' },
};

export const postLogout = async () =>
  await fetch(APIurls.LOGOUT, {
    method: 'POST',
    headers: headers.get,
    credentials: 'include',
  });

export const postRegisterRequest = async (data: RegisterForm) =>
  await fetch(APIurls.SIGNUP, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
    credentials: 'include',
  });

export const postLoginRequest = async (data: LoginForm) =>
  await fetch(APIurls.LOGIN, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
    credentials: 'include',
  });

export const getProfileRequest = async () =>
  await fetch(APIurls.GETUSER, {
    method: 'GET',
    headers: { ...headers.get },
    credentials: 'include',
  });
