import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../actions/singActions';

interface IUserSlice {
  user: [];
  isLoading: boolean;
  error: string;
}

const initialState: IUserSlice = {
  user: [],
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [fetchUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice;
