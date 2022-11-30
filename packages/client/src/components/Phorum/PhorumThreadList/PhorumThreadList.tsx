import React, { FC } from 'react';
import { PhorumThreadListItem } from './__Item/PhorumThreadList__Item';
import './PhorumThreadList.scss';

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
  }[];
}

export const PhorumThreadList: FC<topicsIncoming[]> = (list: Record<number, topicsIncoming>) => {
  const postList = Object.values(list);
  return (
    <ul className="phorum-thread-list">
      {postList.map((item, index) => (
        <PhorumThreadListItem
          thread={item.title}
          pageCount={item.Posts ? item.Posts.length / 10 : 1}
          author={item.User.firstName}
          startDate={item.createdAt.slice(0, 10)}
          replies={item.Posts ? item.Posts.length.toString() : '0'}
          lastReplyUser={item.User.firstName}
          lastReplyDate={item.createdAt.slice(0, 10)}
          threadID={item.id}
          key={'thread' + index}
        />
      ))}
    </ul>
  );
};
