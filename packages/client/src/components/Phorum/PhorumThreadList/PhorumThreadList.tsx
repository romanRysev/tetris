import React, { FC } from 'react';
import { PhorumThreadListItem, ThreadListItemProps } from './__Item/PhorumThreadList__Item';
import './PhorumThreadList.scss';

export const PhorumThreadList: FC<ThreadListItemProps[]> = (list: ThreadListItemProps[]) => {
  const postList = Object.values(list);
  return (
    <ul className="phorum-thread-list">
      {postList.map((item, index) => (
        <PhorumThreadListItem
          thread={item.thread}
          pageCount={item.pageCount}
          author={item.author}
          startDate={item.startDate}
          replies={item.replies}
          lastReplyUser={item.lastReplyUser}
          lastReplyDate={item.lastReplyDate}
          key={'thread' + index}
        />
      ))}
    </ul>
  );
};
