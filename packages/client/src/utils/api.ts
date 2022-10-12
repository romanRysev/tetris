import { APIurls } from './constants';

const headers = {
  post: { 'Content-Type': 'application/json' },
  get: {},
};

export const postLogout = async (token: string) =>
  await fetch(APIurls.LOGOUT, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify({ token }),
  });

export const postRegisterRequest = async (token: string) =>
  await fetch(APIurls.SIGNUP, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify({ token }),
  });

export const postLoginRequest = async (data: any) =>
  await fetch(APIurls.LOGIN, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify({ ...data }),
  });

export const getProfileRequest = async (token: string) =>
  await fetch(APIurls.GETUSER, {
    method: 'GET',
    headers: { ...headers.get, authorization: `Bearer ${token}` },
  });
