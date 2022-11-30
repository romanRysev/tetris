import { createAsyncThunk } from '@reduxjs/toolkit';
import { topicsIncoming } from '../../components/Phorum/PhorumThreadList/PhorumThreadList';

// import {
//   IChangeInfo,
//   IChangePassword,
//   setAvatarRequest,
//   setProfileInfoRequest,
//   setProfilePasswordRequest,
// } from '../../utils/api';
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
  // {
  //   condition: (data, { getState, extra }) => {
  //     const { forum } = getState() as RootState;
  //     const date = forum.isTopicsFetched;
  //     const now = Date.now();
  //     if (date && date - now < 120000) {
  //       return false;
  //     }
  //   },
  // },
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

// export const setTopic = createAsyncThunk('forum/topic/set', async (data: ITopicProps, thunkAPI) => {
//   try {
//       return thunkAPI.fulfillWithValue(data);
//   } catch (e) {
//     return thunkAPI.rejectWithValue(e);
//   }
// });

// ___________

// export const setAvatar = createAsyncThunk('auth/user/avatar', async (data: FormData, thunkAPI) => {
//   try {
//     const res = await setAvatarRequest(data);
//     if ((res as Response)?.status === 401) {
//       return thunkAPI.rejectWithValue('unauthorized');
//     }
//     const user = await res?.json();
//     return res?.ok ? thunkAPI.fulfillWithValue({ ...user }) : thunkAPI.rejectWithValue('Не удалось загрузить аватар');
//   } catch (e) {
//     return thunkAPI.rejectWithValue('Не удалось загрузить аватар');
//   }
// });

// export const setProfileInfo = createAsyncThunk('auth/user', async (data: IChangeInfo, thunkAPI) => {
//   try {
//     const res = await setProfileInfoRequest(data);
//     if ((res as Response)?.status === 401) {
//       return thunkAPI.rejectWithValue('unauthorized');
//     }
//     const user = await res?.json();
//     return res?.ok ? thunkAPI.fulfillWithValue({ ...user }) : thunkAPI.rejectWithValue('Не удалось обновить данные');
//   } catch (e) {
//     return thunkAPI.rejectWithValue('Не удалось обновить данные');
//   }
// });

// export const setProfilePassword = createAsyncThunk('auth/user/password', async (data: IChangePassword, thunkAPI) => {
//   try {
//     const res = await setProfilePasswordRequest(data);
//     if ((res as Response)?.status === 401) {
//       return thunkAPI.rejectWithValue('unauthorized');
//     }
//     return res?.ok ? thunkAPI.fulfillWithValue({}) : thunkAPI.rejectWithValue('Не удалось обновить пароль');
//   } catch (e) {
//     return thunkAPI.rejectWithValue('Не удалось обновить данные');
//   }
// });
