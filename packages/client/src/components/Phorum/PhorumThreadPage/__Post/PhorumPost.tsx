import classNames from 'classnames';
import React, { FC } from 'react';
import { defaulAvatar } from '../../../../consts/prefix';
import './PhorumPost.scss';

export type PhorumPostProps = {
  userName: string;
  userAvatar?: string;
  text: string;
  postDate: Date;
  id: string;
  className?: string;
};

export const PhorumPost: FC<PhorumPostProps> = ({
  userAvatar = defaulAvatar,
  userName,
  text,
  postDate,
  id,
  className,
}) => {
  const cleanText = text.replace(/(<([^>]+)>)/gm, ' ');
  const date = postDate.toLocaleString('ru');
  return (
    <li className={classNames('post', className)} id={'#' + id}>
      <div className="post__userinfo">
        <figure>
          <img
            className="post__avatar"
            src={userAvatar}
            alt={userName}
            onClick={() => console.log('ЗДЕСЬ БУДЕТ ПЕРЕХОД НА ПРОФИЛЬ')}
          />
          <figcaption className="post__username" onClick={() => console.log('И ЗДЕСЬ БУДЕТ ПЕРЕХОД НА ПРОФИЛЬ')}>
            {userName}
          </figcaption>
        </figure>
      </div>
      <div className="post__text-wrapper">
        <div className="post__text">{cleanText}</div>
        <div className="post__info">
          <div className="post_reactions"></div>
          <div className="post__date">{date}</div>
        </div>
      </div>
    </li>
  );
};
