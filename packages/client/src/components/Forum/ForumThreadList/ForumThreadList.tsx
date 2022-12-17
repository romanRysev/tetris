import React, { FC } from 'react';
import { ForumThreadListItem } from './__Item/ForumThreadList__Item';
import './ForumThreadList.scss';

export interface topicsIncoming {
  id: number;
  closed: boolean;
  title: string;
  authorID: number;
  lastReply?: number;
  createdAt: string;
  updatedAt: string;
  User: {
    displayName: string;
    firstName: string;
    secondName: string;
    avatar: string;
  };
  Posts: {
    message: string;
    User: {
      displayName: string;
      firstName: string;
      secondName: string;
      avatar: string;
    };
    id: number;
    createdAt: string;
  }[];
}

const getDataFromLastReply = (allData: topicsIncoming, id?: number) => {
  if (!id) {
    return { date: '', name: '' };
  }
  const post = allData.Posts.find((id) => id === id);
  const date = post?.createdAt;
  const name = post?.User.displayName || `${post?.User.firstName} ${post?.User.secondName}`;
  return { date, name };
};

export const ForumThreadList: FC<topicsIncoming[]> = (list: Record<number, topicsIncoming>) => {
  const postList = Object.values(list);
  return (
    <ul className="forum-thread-list">
      {postList.map((item, index) => (
        <ForumThreadListItem
          thread={item.title}
          author={item.User.firstName}
          startDate={item.createdAt.slice(0, 10)}
          replies={item.Posts ? item.Posts.length.toString() : '0'}
          lastReplyUser={getDataFromLastReply(item, item.lastReply).name}
          lastReplyDate={getDataFromLastReply(item, item.lastReply).date?.slice(0, 10) || ''}
          threadID={item.id}
          key={'thread' + index}
        />
      ))}
    </ul>
  );
};
