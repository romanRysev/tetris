import { APIurls } from './constants';

const headers = {
  post: { 'Content-Type': 'application/json' },
  get: { 'Content-Type': 'application/json' },
};

export const postLogout = async (token: string) =>
  await fetch(APIurls.LOGOUT, {
    method: 'GET',
    headers: headers.get,
    body: JSON.stringify({ token }),
    credentials: 'include',
  });

export const postRegisterRequest = async (data: any) =>
  await fetch(APIurls.SIGNUP, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify({ ...data }),
    credentials: 'include',
  });

export const postLoginRequest = async (data: any) =>
  await fetch(APIurls.LOGIN, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify({ ...data }),
    credentials: 'include',
  });

export const getProfileRequest = async () =>
  await fetch(APIurls.GETUSER, {
    method: 'GET',
    headers: { ...headers.get },
    credentials: 'include',
  });
