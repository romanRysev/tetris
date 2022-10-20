import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhorumThreadListPageCounter } from '../__PageCounter/PhorumThreadList__PageCounter';

import './PhorumThreadList__Item.scss';

export interface ThreadListItemProps {
  thread: string;
  author: string;
  startDate: string;
  pageCount: number;
  replies: string;
  lastReplyUser: string;
  lastReplyDate: string;
}

export const PhorumThreadListItem: FC<ThreadListItemProps> = (props) => {
  const { thread, pageCount, replies, lastReplyUser, lastReplyDate, author, startDate } = props;
  const navigate = useNavigate();
  const handleThreadClick = useCallback(() => {
    // TODO: отправить данные
    navigate('/phorum/thread');
  }, [navigate]);
  return (
    <li className="phorum-thread-list__item">
      <div className="thread">
        <span className="thread__text" onClick={handleThreadClick}>
          {thread}
        </span>{' '}
        <PhorumThreadListPageCounter pages={pageCount} />
        <div className="thread__info">
          {author} {startDate}
        </div>
      </div>
      <div className="replies">{replies}</div>
      <div className="last-reply">
        <div className="last-reply__user">{lastReplyUser}</div>
        <div className="last-reply__date">{lastReplyDate}</div>
      </div>
    </li>
  );
};
