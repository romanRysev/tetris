import React, { FC } from 'react';
import { PhorumThreadListItem, ThreadListItemProps } from '../__ThreadListItem/PhorumThreadListItem';

export const ThreadList: FC<ThreadListItemProps[]> = (list: ThreadListItemProps[]) => {
  const postList = Object.values(list);
  return (
    <ul className="thread-list__list">
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
