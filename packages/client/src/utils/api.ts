import { LoginForm } from '../pages/Login/Login';
import { RegisterForm } from '../pages/Register/Register';
import { APIurls } from './constants';
import { okFetch, realFetch } from './realFetch';

const headers = {
  post: { 'Content-Type': 'application/json' },
  get: { 'Content-Type': 'application/json' },
  put: { 'Content-Type': 'application/json' },
};

export interface IChangeInfo {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  display_name: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface OAuthLoginData {
  code: string;
  redirect_uri: string;
}

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
  await okFetch(APIurls.LOGIN, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
    credentials: 'include',
  });

export const getProfileRequest = async () =>
  await realFetch(APIurls.GETUSER, {
    method: 'GET',
    headers: { ...headers.get },
    credentials: 'include',
  });

export const getServiceId = async (url: string) =>
  await fetch(`${APIurls.SERVICEID}?redirect_uri=${url}`, {
    method: 'GET',
    headers: headers.get,
  });

export const oAuthLogin = async (data: OAuthLoginData) =>
  await fetch(APIurls.OAUTHLOGIN, {
    method: 'POST',
    headers: headers.post,
    credentials: 'include',
    body: JSON.stringify(data),
  });

export const setAvatarRequest = async (data: FormData) =>
  await realFetch(APIurls.CHANGEAVATAR, {
    method: 'PUT',
    headers: { accept: 'application/xml' },
    credentials: 'include',
    body: data,
  });

export const setProfileInfoRequest = async (data: IChangeInfo) =>
  await realFetch(APIurls.CHANGEPROFILE, {
    method: 'PUT',
    headers: headers.put,
    credentials: 'include',
    body: JSON.stringify(data),
  });

export const setProfilePasswordRequest = async (data: IChangePassword) =>
  await realFetch(APIurls.CHANGEPASS, {
    method: 'PUT',
    headers: headers.put,
    credentials: 'include',
    body: JSON.stringify({ ...data }),
  });
