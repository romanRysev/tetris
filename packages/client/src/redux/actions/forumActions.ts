import { createAsyncThunk } from '@reduxjs/toolkit';
import { topicsIncoming } from '../../components/Phorum/PhorumThreadList/PhorumThreadList';
import { changeLastReply, ITopicProps, makeNewPost, makeNewTopic } from '../../utils/backEndApi';

export const getTopics = createAsyncThunk(
  'forum/topic/get',
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

export const newTopic = createAsyncThunk('forum/topic', async (data: ITopicProps, thunkAPI) => {
  try {
    const res = await makeNewTopic(data);
    if ((res as Response)?.ok) {
      const topic = await res.json();
      const post = await makeNewPost({
        authorID: topic.authorID,
        topicID: topic.id,
        message: data.message || '',
      });
      if (post?.ok) {
        const postID = await post.json();
        const upd = await changeLastReply(postID.id, topic.id);
        if (upd?.ok) {
          return thunkAPI.fulfillWithValue(topic);
        }
      }
    }
    const err = await res?.json();
    throw new Error(err.reason);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
