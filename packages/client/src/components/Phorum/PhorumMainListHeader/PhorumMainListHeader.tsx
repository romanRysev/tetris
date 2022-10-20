import React, { FC } from 'react';
import './PhorumMainListHeader.scss';

export const PhorumMainListHeader: FC = () => {
  return (
    <div className="phorum-main-list-header">
      <div className="phorum-main-list-header__thread">Тема</div>
      <div className="phorum-main-list-header__replies">Ответов</div>
      <div className="phorum-main-list-header__last-reply">Последний ответ</div>
    </div>
  );
};
