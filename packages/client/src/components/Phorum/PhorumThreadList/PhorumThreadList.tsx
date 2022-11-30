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

// {"id":2,"title":"ПРЕВЕД МЕДВЕДЫ","authorID":84900,"closed":false,"lastReply":null,"createdAt":"2022-11-29T14:35:52.609Z","updatedAt":"2022-11-29T14:35:52.609Z","User":{"firstName":"Mortarion","secondName":"Emperorsson","avatar":"/333c170a-5070-4269-abb6-eeaef3159744/158145e4-92a2-4dd3-a09d-37fd43a7049b_mort.png","displayName":null},"Posts":[]}]}

export const PhorumThreadList: FC<topicsIncoming[]> = (list: Record<number, topicsIncoming>) => {
  console.log(list, 'list');
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
