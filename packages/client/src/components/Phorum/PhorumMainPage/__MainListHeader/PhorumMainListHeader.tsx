import React, { FC } from 'react';
import './PhorumMainListHeader.scss';

export const MainListHeader: FC = () => {
  return (
    <div className="thread-list__head">
      <div className="thread-list__thread_header">Тема</div>
      <div className="thread-list__replies_header">Ответов</div>
      <div className="thread-list__last-reply_header">Последний ответ</div>
    </div>
  );
};
