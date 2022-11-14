import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderBoard, GetLeaders } from '../../utils/api';
import { RootState } from '../store';

export const setLeaderBoard = createAsyncThunk(
  'leaders',
  async (data: GetLeaders, thunkAPI) => {
    try {
      const res = await getLeaderBoard(data);
      if ((res as Response)?.status === 401) {
        return thunkAPI.rejectWithValue('unauthorized');
      }
      const leaders = await res?.json();
      return res?.ok
        ? thunkAPI.fulfillWithValue({ ...leaders })
        : thunkAPI.rejectWithValue('Не удалось получить данные');
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить данные');
    }
  },
  {
    condition: (data, { getState, extra }) => {
      const { leaders } = getState() as RootState;
      const date = leaders.date;
      const now = Date.now();
      if (date && date - now < 100000) {
        return false;
      }
    },
  },
);
