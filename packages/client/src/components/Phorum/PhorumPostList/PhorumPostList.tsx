import React, { FC } from 'react';
import { filePrefix } from '../../../consts/prefix';
import { useAppSelector } from '../../../redux/hooks';
import { defaulAvatar } from '../../../utils/constants';
import { PhorumPost } from '../PhorumPost/PhorumPost';
import './PhorumPostList.scss';

export interface IForumPostsRaw {
  id: number;
  message: string;
  authorID: number;
  topicID: number;
  parentID?: number;
  hide?: boolean;
  firstLevel?: boolean;
  createdAt: string;
  updatedAt: string;
  User: {
    displayName: string;
    firstName: string;
    secondName: string;
    avatar: string;
  };
  Reactions: {
    like: boolean;
    dislike: boolean;
    authorID: number;
  }[];
}

export const PhorumPostList: FC<IForumPostsRaw[]> = (postList: IForumPostsRaw[]) => {
  const userProfile = useAppSelector((state) => state.auth.user);
  const list = Object.values(postList);
  const countReaction = (
    reaction: 'like' | 'dislike',
    item: {
      like: boolean;
      dislike: boolean;
      authorID: number;
    }[],
  ) => {
    let count = 0;
    item.map((react) => {
      if (react[reaction]) {
        count++;
      }
    });
    return count;
  };

  const countMyReactions = (
    item: {
      like: boolean;
      dislike: boolean;
      authorID: number;
    }[],
  ) => {
    let like = false;
    let dislike = false;
    item.map((reaction) => {
      if (reaction.authorID === userProfile.id) {
        like = reaction.like;
        dislike = reaction.dislike;
      }
    });
    return { like, dislike };
  };

  return (
    <ul className="phorum-post-list">
      {list.map((item, index) => (
        <PhorumPost
          userAvatar={`${filePrefix}${item.User.avatar}` || defaulAvatar}
          userName={item.User.displayName || `${item.User.firstName} ${item.User.secondName}`}
          text={item.message}
          postDate={item.createdAt.slice(0, 10)}
          id={item.id}
          likes={countReaction('like', item.Reactions)}
          dislikes={countReaction('dislike', item.Reactions)}
          like={countMyReactions(item.Reactions).like}
          dislike={countMyReactions(item.Reactions).dislike}
          key={'post' + index}
        />
      ))}
    </ul>
  );
};
