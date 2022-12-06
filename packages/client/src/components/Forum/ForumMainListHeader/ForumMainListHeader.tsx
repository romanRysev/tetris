import React, { FC } from 'react';
import './ForumMainListHeader.scss';

export const ForumMainListHeader: FC = () => {
  return (
    <div className="forum-main-list-header">
      <div className="forum-main-list-header__thread">Тема</div>
      <div className="forum-main-list-header__replies">Ответов</div>
      <div className="forum-main-list-header__last-reply">Последний ответ</div>
    </div>
  );
};
