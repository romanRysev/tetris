/* eslint-disable no-unused-vars */
export const filePrefix = 'https://ya-praktikum.tech/api/v2/resources';

export const defaulAvatar = 'https://www.fillmurray.com/g/100/100';

export const REDIRECT_URI = 'http://codinsk.ya-praktikum.tech';

export enum APIurls {
  BASE = 'https://ya-praktikum.tech/api/v2',
  LOGIN = 'https://ya-praktikum.tech/api/v2/auth/signin',
  SIGNUP = 'https://ya-praktikum.tech/api/v2/auth/signup',
  GETUSER = 'https://ya-praktikum.tech/api/v2/auth/user',
  GETUSERBYID = 'https://ya-praktikum.tech/api/v2/user/',
  LOGOUT = 'https://ya-praktikum.tech/api/v2/auth/logout',
  CHATS = 'https://ya-praktikum.tech/api/v2/chats',
  CREATECHAT = 'https://ya-praktikum.tech/api/v2/chats',
  CHATAVATAR = 'https://ya-praktikum.tech/api/v2/chats/avatar',
  CHATUSERS = 'https://ya-praktikum.tech/api/v2/chats/users',
  GETTOKEN = 'https://ya-praktikum.tech/api/v2/chats/token/',
  CHANGEPROFILE = 'https://ya-praktikum.tech/api/v2/user/profile',
  CHANGEPASS = 'https://ya-praktikum.tech/api/v2/user/password',
  CHANGEAVATAR = 'https://ya-praktikum.tech/api/v2/user/profile/avatar',
  SEEKUSER = 'https://ya-praktikum.tech/api/v2/user/search',
  LEADERBOARD = 'https://ya-praktikum.tech/api/v2/leaderboard',
  SERVICEID = 'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id',
  OAUTHLOGIN = 'https://ya-praktikum.tech/api/v2/oauth/yandex',
}

export enum backEndUrls {
  USER = '/api/user',
  FORUM = '/api/forum',
  THEME = '/api/theme',
  LEADERS = '/api/leaderboard',
}
