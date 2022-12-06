import { createSlice } from '@reduxjs/toolkit';
import { getTopics } from '../actions/forumActions';

interface IReactions {
  like: boolean;
  dislike: boolean;
  authorID: boolean;
}

interface ITopicRows {
  id: number;
  title: string;
  authorID: number;
  lastReply?: number | undefined;
  closed: boolean;
  createdAt: string;
  updatedAt: string;
  User: {
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
  };
  Posts: {
    message: string;
    id: number;
    User: { displayName: string; firstName: string; secondName: string; avatar: string };
    createdAt: string;
  }[];
  Reactions: IReactions[];
}

interface IForumSlice {
  topics: {
    count: number;
    rows: ITopicRows[];
  };
  isTopicsFetched: number | undefined;
  topicActual: number;
}

const forumInitState: IForumSlice = {
  topics: {
    count: 0,
    rows: [],
  },
  isTopicsFetched: undefined,
  topicActual: 0,
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState: forumInitState,
  reducers: {},
  extraReducers: {
    [getTopics.fulfilled.type]: (state, action) => {
      state.topics = { ...action.payload };
      state.isTopicsFetched = Date.now();
    },
  },
});
