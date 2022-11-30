import classNames from 'classnames';
import React, { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { reactWithDislike, reactWithLike } from '../../../utils/backEndApi';
import './PhorumPost.scss';
import defaultAvatar from './../../../assets/avatar.svg';

export type PhorumPostProps = {
  userName: string;
  userAvatar?: string;
  text: string;
  postDate: string;
  id: number;
  className?: string;
  likes?: number;
  dislikes?: number;
  like?: boolean;
  dislike?: boolean;
};

export const PhorumPost: FC<PhorumPostProps> = ({
  userAvatar = defaultAvatar,
  userName,
  text,
  postDate,
  id,
  className,
  likes,
  dislikes,
  like,
  dislike,
}) => {
  const navigate = useNavigate();
  const userProfile = useAppSelector((state) => state.auth.user);

  const [myLike, setLike] = useState(like);
  const [likesCount, setLikesCount] = useState(likes || 0);
  const [myDislike, setDislike] = useState(dislike);
  const [dislikesCount, setDislikesCount] = useState(dislikes || 0);

  const handleLike = useCallback(async () => {
    if (myLike === true) {
      await reactWithLike({
        authorID: userProfile.id,
        postID: id,
        like: false,
      });
      setLike(false);
      setLikesCount(likesCount - 1);
    } else if (myLike === false) {
      await reactWithLike({
        authorID: userProfile.id,
        postID: id,
        like: true,
      });
      setLike(true);
      setLikesCount(likesCount + 1);
    }
  }, [id, userProfile.id, myLike, likesCount]);

  const handleDislike = useCallback(async () => {
    if (myDislike === true) {
      await reactWithDislike({
        authorID: userProfile.id,
        postID: id,
        dislike: false,
      });
      setDislike(false);
      setDislikesCount(dislikesCount - 1);
    } else if (myDislike === false) {
      await reactWithDislike({
        authorID: userProfile.id,
        postID: id,
        dislike: true,
      });
      setDislike(true);
      setDislikesCount(dislikesCount + 1);
    }
  }, [id, myDislike, userProfile.id, dislikesCount]);

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
          <div className="phorum-post__reactions">
            <div className="phorum-post__likes">
              <div
                className={classNames('reaction', 'reaction-like', myLike && 'reaction-like_active')}
                onClick={handleLike}
              ></div>
              <div className="reaction-count">{likesCount}</div>
            </div>
            <div className="phorum-post__dislikes">
              <div
                className={classNames('reaction', 'reaction-dislike', myDislike && 'reaction-dislike_active')}
                onClick={handleDislike}
              ></div>
              <div className="reaction-count">{dislikesCount}</div>
            </div>
          </div>
          <time className="phorum-post__date">{postDate}</time>
        </div>
      </div>
    </li>
  );
};
