import React, { FC } from 'react';
import { filePrefix } from '../../../consts/prefix';
import { useAppSelector } from '../../../redux/hooks';
import defaultAvatar from './../../../assets/avatar.svg';
import { ForumPost } from '../ForumPost/ForumPost';
import './ForumPostList.scss';

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

export const ForumPostList: FC<IForumPostsRaw[]> = (postList: IForumPostsRaw[]) => {
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
    const count = item.filter((react) => react[reaction]).length;
    return count;
  };

  const countMyReactions = (
    item: {
      like: boolean;
      dislike: boolean;
      authorID: number;
    }[],
  ) => {
    const myReaction = item.find((reaction) => reaction.authorID === userProfile.id);
    const like = myReaction?.like || false;
    const dislike = myReaction?.dislike || false;

    return { like, dislike };
  };

  return (
    <ul className="forum-post-list">
      {list.map((item, index) => (
        <ForumPost
          userAvatar={`${filePrefix}${item.User.avatar}` || defaultAvatar}
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
