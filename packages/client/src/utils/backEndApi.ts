import { backEndUrls } from './constants';
import { UserChars } from './../redux/reducers/userSlice';
import { realFetch } from './realFetch';

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

export interface ILeader {
  score: number;
  User: {
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
  };
  userID: number;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface AddLeader {
  userID: number;
  score: number;
}

export interface GetLeaders {
  offset: number;
  limit: number;
}

export const getUserFromDB = async (id: number) =>
  await realFetch(`${host}${backEndUrls.USER}/${id}`, {
    method: 'GET',
    headers: headers.get,
  });

export const sendUserToDB = async (data: UserChars) =>
  await realFetch(`${host}${backEndUrls.USER}`, {
    method: 'PUT',
    headers: headers.post,
    body: JSON.stringify(data),
  });

export const getTheme = async (userID: number) =>
  await realFetch(`${host}${backEndUrls.THEME}/${userID}`, {
    method: 'GET',
    headers: headers.get,
  });

export const sendThemeToDB = async (data: IThemeProps) =>
  await realFetch(`${host}${backEndUrls.THEME}`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify(data),
  });

export const updateTheme = async (data: IThemeUdpateProps, userID: number) =>
  await realFetch(`${host}${backEndUrls.THEME}/${userID}`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify(data),
  });

export const getTopicList = async (data = '') =>
  await realFetch(`${host}${backEndUrls.FORUM}${data}`, {
    method: 'GET',
    headers: headers.url,
  });

export const makeNewTopic = async (data: ITopicProps) =>
  await realFetch(`${host}${backEndUrls.FORUM}`, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
  });

export const changeLastReply = async (lastReply: number, id: number) =>
  await realFetch(`${host}${backEndUrls.FORUM}/${id}`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify({ lastReply, id }),
  });

export const getPostsForTopic = async (topicID: number) =>
  await realFetch(`${host}${backEndUrls.FORUM}/${topicID}`, {
    method: 'GET',
    headers: headers.get,
  });

export const makeNewPost = async (data: IPostProps) =>
  await realFetch(`${host}${backEndUrls.FORUM}/${Number(data.topicID)}`, {
    method: 'POST',
    headers: headers.post,
    body: JSON.stringify(data),
  });

export const reactWithLike = async (data: IReactionProps) =>
  await realFetch(`${host}${backEndUrls.FORUM}/like`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify(data),
  });

export const reactWithDislike = async (data: IReactionProps) =>
  await realFetch(`${host}${backEndUrls.FORUM}/dislike`, {
    method: 'PUT',
    headers: headers.put,
    body: JSON.stringify(data),
  });

export const addToLeaderBoard = async (data: AddLeader) =>
  await realFetch(`${host}${backEndUrls.LEADERS}`, {
    method: 'PUT',
    headers: headers.put,
    // credentials: 'include',
    body: JSON.stringify({ ...data }),
  });

export const getLeaderBoard = async (data: GetLeaders) =>
  await realFetch(`${host}${backEndUrls.LEADERS}`, {
    method: 'POST',
    headers: headers.post,
    // credentials: 'include',
    body: JSON.stringify({ ...data }),
  });
