import { createSlice } from '@reduxjs/toolkit';
import { UserProps } from '../../components/UserInfo/UserInfo';
import { dummyUser } from '../../consts/dummyData';
import { login, logout, register, checkLogin } from '../actions/singActions';
import { setAvatar, setProfileInfo } from '../actions/profileActions';
import { setLeaderBoard } from '../actions/leaderBoardActions';
import { ILeader } from '../../utils/api';
interface IUserSlice {
  user: UserChars;
  isAuthorized: boolean;
  isFetching: boolean;
  fetchingFailed: boolean;
  error: string | null;
}

export interface UserChars {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ILeadersSlice {
  leaderList: Record<'data', ILeader>[] | [];
  date: number | undefined;
  isAuthorized: boolean;
}

const leadersInitState: ILeadersSlice = {
  leaderList: [],
  date: undefined,
  isAuthorized: true,
};

function convertUser(user: UserProps): UserChars {
  return {
    id: user.id,
    firstName: user.first_name,
    secondName: user.second_name,
    displayName: user.display_name,
    login: user.login,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
  };
}

const initialState: IUserSlice = {
  user: convertUser(dummyUser),
  isAuthorized: false,
  isFetching: false,
  fetchingFailed: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled.type]: (state, action) => {
      state.fetchingFailed = false;
      state.isAuthorized = true;
      state.user = convertUser(action.payload);
      state.isFetching = false;
    },
    [register.pending.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = true;
    },
    [register.rejected.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = false;
    },
    [login.fulfilled.type]: (state, action) => {
      state.fetchingFailed = false;
      state.isAuthorized = true;
      state.user = convertUser(dummyUser);
      state.isFetching = false;
    },
    [login.pending.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = true;
    },
    [login.rejected.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = false;
    },
    [checkLogin.fulfilled.type]: (state, action) => {
      state.fetchingFailed = false;
      state.isAuthorized = !!action.payload.id;
      state.user = convertUser(action.payload);
      state.isFetching = false;
    },
    [checkLogin.pending.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = true;
    },
    [checkLogin.rejected.type]: (state) => {
      state.fetchingFailed = true;
      state.isAuthorized = false;
      state.isFetching = false;
    },
    [logout.fulfilled.type]: (state) => {
      state.isAuthorized = false;
      state.user = convertUser(dummyUser);
    },
    [setAvatar.fulfilled.type]: (state, action) => {
      state.user.avatar = action.payload.avatar;
    },
    [setAvatar.rejected.type]: (state, action) => {
      if (action.payload == 'unauthorized') {
        state.isAuthorized = false;
      }
    },
    [setProfileInfo.fulfilled.type]: (state, action) => {
      state.user = convertUser(action.payload);
    },
    [setProfileInfo.rejected.type]: (state, action) => {
      if (action.payload == 'unauthorized') {
        state.isAuthorized = false;
      }
    },
    [setLeaderBoard.rejected.type]: (state, action) => {
      if (action.payload == 'unauthorized') {
        state.isAuthorized = false;
      }
    },
  },
});

export const leadersSlice = createSlice({
  name: 'leaders',
  initialState: leadersInitState,
  reducers: {},
  extraReducers: {
    [setLeaderBoard.fulfilled.type]: (state, action) => {
      state.leaderList = action.payload;
      state.date = Date.now();
      state.isAuthorized = true;
    },
  },
});
