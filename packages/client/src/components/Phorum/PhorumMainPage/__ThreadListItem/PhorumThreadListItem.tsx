import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageCounter } from '../../__PageCount/PhorumPageCount';
import './PhorumThreadListItem.scss';

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
    <li className="thread-list__item">
      <div className="thread">
        <div className="thread__thread">
          <span className="thread__text" onClick={handleThreadClick}>
            {thread}
          </span>{' '}
          <PageCounter pages={pageCount} />
        </div>
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
