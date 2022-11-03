import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderBoard, GetLeaders } from '../../utils/api';

export const setLeaderBoard = createAsyncThunk('auth/leaders', async (data: GetLeaders, thunkAPI) => {
  try {
    const res = await getLeaderBoard(data);
    const leaders = await res.json();
    return res.ok ? thunkAPI.fulfillWithValue({ ...leaders }) : thunkAPI.rejectWithValue('Не удалось получить данные');
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось получить данные');
  }
});
