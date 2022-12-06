import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForumThreadListPageCounter } from '../__PageCounter/ForumThreadList__PageCounter';

import './ForumThreadList__Item.scss';

export interface ThreadListItemProps {
  thread: string;
  author: string;
  startDate: string;
  pageCount: number;
  replies: string;
  lastReplyUser: string;
  lastReplyDate: string;
  threadID: number;
}

export const ForumThreadListItem: FC<ThreadListItemProps> = (props) => {
  const { thread, pageCount, replies, lastReplyUser, lastReplyDate, author, startDate, threadID } = props;
  const navigate = useNavigate();
  const handleThreadClick = useCallback(async () => {
    navigate(`/forum/thread/#${threadID}`);
  }, [navigate, threadID]);
  // TODO привесить отправку на профиль ? и отправку к последнему сообщению
  return (
    <li className="forum-thread-list__item">
      <div className="thread">
        <span className="thread__text" onClick={handleThreadClick} title={`/forum/thread/${threadID}`}>
          {thread}
        </span>{' '}
        <ForumThreadListPageCounter pages={pageCount} />
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
