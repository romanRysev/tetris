import React, { FC } from 'react';
import './PhorumMainListHeader.scss';

interface MainListHeaderProps {
  threadHeader?: string;
  repliesHeader?: string;
  lastReplyHeader?: string;
}

export const MainListHeader: FC<MainListHeaderProps> = ({
  threadHeader = 'Тема',
  repliesHeader = 'Ответов',
  lastReplyHeader = 'Последний ответ',
}) => {
  return (
    <div className="thread-list__head">
      <div className="thread-list__thread_header">{threadHeader}</div>
      <div className="thread-list__replies_header">{repliesHeader}</div>
      <div className="thread-list__last-reply_header">{lastReplyHeader}</div>
    </div>
  );
};
