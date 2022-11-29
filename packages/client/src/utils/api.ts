import { LoginForm } from '../pages/Login/Login';
import { RegisterForm } from '../pages/Register/Register';
import { APIurls } from './constants';

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

export interface ILeader {
  score: number;
  user: {
    avatar: string;
    userName: string;
    id: number;
  };
  date: string;
}

export interface AddLeader {
  data: ILeader;
  ratingFieldName: string;
  teamName: string;
}

export interface GetLeaders {
  ratingFieldName: string;
  cursor: 0;
  limit: 10;
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

export const setAvatarRequest = async (data: FormData) =>
  await fetch(APIurls.CHANGEAVATAR, {
    method: 'PUT',
    headers: { accept: 'application/xml' },
    credentials: 'include',
    body: data,
  });

export const setProfileInfoRequest = async (data: IChangeInfo) =>
  await fetch(APIurls.CHANGEPROFILE, {
    method: 'PUT',
    headers: headers.put,
    credentials: 'include',
    body: JSON.stringify(data),
  });

export const setProfilePasswordRequest = async (data: IChangePassword) =>
  await fetch(APIurls.CHANGEPASS, {
    method: 'PUT',
    headers: headers.put,
    credentials: 'include',
    body: JSON.stringify({ ...data }),
  });

export const addToLeaderBoard = async (data: AddLeader) =>
  await fetch(APIurls.LEADERBOARD, {
    method: 'POST',
    headers: headers.post,
    credentials: 'include',
    body: JSON.stringify({ ...data }),
  });

export const getLeaderBoard = async (data: GetLeaders) =>
  await fetch(`${APIurls.LEADERBOARD}/CodinskTest`, {
    method: 'POST',
    headers: headers.post,
    credentials: 'include',
    body: JSON.stringify({ ...data }),
  });
