import { createAsyncThunk } from '@reduxjs/toolkit';
import { topicsIncoming } from '../../components/Forum/ForumThreadList/ForumThreadList';

export const getTopics = createAsyncThunk(
  'forum/topic',
  async (
    data: {
      count: number;
      rows: topicsIncoming[];
    },
    thunkAPI,
  ) => {
    try {
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
