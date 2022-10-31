import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, checkLogin } from '../actions/singActions';
import { setAvatar, setProfileInfo } from '../actions/profileActions';

interface IUserData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
  avatar: string;
}

interface IUserSlice {
  user: IUserData | Record<string, never>;
  isAuthorized: boolean;
  isFetching: boolean;
  fetchingFailed: boolean;
  error: string | null;
}

const initialState: IUserSlice = {
  user: {},
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
      state.user = action.payload;
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
      state.user = action.payload;
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
      state.user = action.payload;
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
      state.user = {};
    },
    [setAvatar.fulfilled.type]: (state, action) => {
      state.user.avatar = action.payload.avatar;
    },
    [setProfileInfo.fulfilled.type]: (state, action) => {
      state.user = action.payload;
    },
  },
});
