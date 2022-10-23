import classNames from 'classnames';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaulAvatar } from '../../../consts/prefix';
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
  const date = postDate.toLocaleString('ru');
  const navigate = useNavigate();
  return (
    <li className={classNames('phorum-post', className)} id={'#' + id}>
      <div className="phorum-post__userinfo">
        <figure>
          <img className="phorum-post__avatar" src={userAvatar} alt={userName} onClick={() => navigate('/profile')} />
          <figcaption className="phorum-post__username" onClick={() => navigate('/profile')}>
            {userName}
          </figcaption>
        </figure>
      </div>
      <div className="phorum-post__text-wrapper">
        <div className="phorum-post__text">{text}</div>
        <div className="phorum-post__info">
          <div className="phorum-post__reactions"></div>
          <div className="phorum-post__date">{date}</div>
        </div>
      </div>
    </li>
  );
};
