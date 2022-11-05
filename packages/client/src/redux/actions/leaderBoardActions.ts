import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderBoard, GetLeaders } from '../../utils/api';

export const setLeaderBoard = createAsyncThunk('leaders', async (data: GetLeaders, thunkAPI) => {
  try {
    console.log('1');
    const res = await getLeaderBoard(data);
    const leaders = await res.json();
    console.log(leaders, 'что передаем');
    return res.ok ? thunkAPI.fulfillWithValue({ ...leaders }) : thunkAPI.rejectWithValue('Не удалось получить данные');
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось получить данные');
  }
});
