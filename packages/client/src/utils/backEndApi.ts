import { backEndUrls } from './constants';
import { UserChars } from './../redux/reducers/userSlice';

const headers = {
  post: { 'Content-Type': 'application/json' },
  get: { 'Content-Type': 'application/json' },
  put: { 'Content-Type': 'application/json' },
  url: { 'Content-Type': 'application/x-www-form-urlencoded' },
};

// чтобы от нас запускалось
// дальше закомментированы credentials,
// потому как у меня такое чувство, что потом их надо будет включить
const host = 'http://localhost:3001';

export interface IThemeProps {
  themeActive: string;
  userID: number;
  soundOn: boolean;
  musicOn: boolean;
  soundLevel: string;
  musicLevel: string;
}

export interface IThemeUdpateProps {
  themeActive?: string;
  userID?: number;
  soundOn?: boolean;
  musicOn?: boolean;
  soundLevel?: string;
  musicLevel?: string;
}

export interface ITopicProps {
  title: string;
  authorID: number;
  closed?: boolean;
  lastReply?: number;
  message?: string;
}

export interface IPostProps {
  authorID: number;
  topicID: number;
  message: string;
  hide?: boolean;
  firstLevel?: boolean;
  parentID?: number;
}

export interface IReactionProps {
  authorID: number;
  postID: number;
  like?: boolean;
  dislike?: boolean;
}

export const getUserFromDB = async (id: number) =>
  await fetch(`${host}${backEndUrls.USER}/${id}`, {
    method: 'GET',
    headers: headers.get,
    // credentials: 'include',
  });

export const sendUserToDB = async (data: UserChars) =>
  await fetch(`${host}${backEndUrls.USER}`, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
    // credentials: 'include',
  });

export const getTheme = async (userID: number) =>
  await fetch(`${host}${backEndUrls.THEME}/${userID}`, {
    method: 'GET',
    headers: headers.get,
    // credentials: 'include',
  });

export const sendThemeToDB = async (data: IThemeProps) =>
  await fetch(`${host}${backEndUrls.THEME}`, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
    // credentials: 'include',
  });

export const updateTheme = async (data: IThemeUdpateProps, userID: number) =>
  await fetch(`${host}${backEndUrls.THEME}/${userID}`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify(data),
    // credentials: 'include',
  });

export const getTopicList = async (data = '') =>
  await fetch(`${host}${backEndUrls.FORUM}${data}`, {
    method: 'GET',
    headers: headers.url,
    // credentials: 'include',
  });

export const makeNewTopic = async (data: ITopicProps) =>
  await fetch(`${host}${backEndUrls.FORUM}`, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
    // credentials: 'include',
  });

export const changeLastReply = async (lastReply: number, topicID: number) =>
  await fetch(`${host}${backEndUrls.FORUM}/${topicID}`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify({ lastReply, topicID }),
    // credentials: 'include',
  });

export const getPostsForTopic = async (topicID: number) =>
  await fetch(`${host}${backEndUrls.FORUM}/${topicID}`, {
    method: 'GET',
    headers: headers.get,
    // credentials: 'include',
  });

export const makeNewPost = async (data: IPostProps) =>
  await fetch(`${host}${backEndUrls.FORUM}/${Number(data.topicID)}`, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
    // credentials: 'include',
  });

export const reactWithLike = async (data: IReactionProps) =>
  await fetch(`${host}${backEndUrls.FORUM}/like`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify(data),
    // credentials: 'include',
  });

export const reactWithDislike = async (data: IReactionProps) =>
  await fetch(`${host}${backEndUrls.FORUM}/dislike`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify(data),
    // credentials: 'include',
  });
