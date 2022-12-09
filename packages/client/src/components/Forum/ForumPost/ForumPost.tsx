import classNames from 'classnames';
import React, { FC, FormEvent, useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { makeNewPost, reactWithDislike, reactWithLike } from '../../../utils/backEndApi';
import './ForumPost.scss';
import defaultAvatar from './../../../assets/avatar.svg';
import { Button } from './../../Button/Button';
import { unAuthorised } from '../../../redux/actions/singActions';

export type ForumPostProps = {
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
  level?: number;
  getDataUp: () => void;
};

export const ForumPost: FC<ForumPostProps> = ({
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
  level,
  getDataUp,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.auth.user);

  const [myLike, setMyLike] = useState(like);
  const [likesCount, setLikesCount] = useState(likes || 0);
  const [myDislike, setMyDislike] = useState(dislike);
  const [dislikesCount, setDislikesCount] = useState(dislikes || 0);

  const location = useLocation();
  const topicID = location.hash.slice(1);

  const handleLike = useCallback(async () => {
    if (myLike === true) {
      await reactWithLike({
        authorID: userProfile.id,
        postID: id,
        like: false,
      });
      setMyLike(false);
      setLikesCount(likesCount - 1);
    } else if (myLike === false) {
      await reactWithLike({
        authorID: userProfile.id,
        postID: id,
        like: true,
      });
      setMyLike(true);
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
      setMyDislike(false);
      setDislikesCount(dislikesCount - 1);
    } else if (myDislike === false) {
      await reactWithDislike({
        authorID: userProfile.id,
        postID: id,
        dislike: true,
      });
      setMyDislike(true);
      setDislikesCount(dislikesCount + 1);
    }
  }, [id, myDislike, userProfile.id, dislikesCount]);

  const [isOpenedResponse, setOpenedResponse] = useState(false);
  const responseRef = useRef<HTMLTextAreaElement>(null);

  const toggleResponse = useCallback(() => {
    setOpenedResponse(!isOpenedResponse);
  }, [isOpenedResponse]);

  const handleResponse = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const message = responseRef.current?.value;
      if (message) {
        try {
          await makeNewPost({
            authorID: userProfile.id,
            topicID: Number(topicID),
            message: message,
            firstLevel: false,
            parentID: id,
          });
          setOpenedResponse(false);
          getDataUp();
        } catch (error) {
          if ((error as Record<string, string>).reason?.includes('not valid')) {
            dispatch(unAuthorised(false));
          }
        }
      }
    },
    [id, topicID, userProfile.id, dispatch, getDataUp],
  );

  return (
    <li className={classNames('forum-post', `forum-post_level${level}`, className)} id={'#' + id}>
      <div className="forum-post__userinfo">
        <figure>
          <img className="forum-post__avatar" src={userAvatar} alt={userName} onClick={() => navigate('/profile')} />
          <figcaption className="forum-post__username" onClick={() => navigate('/profile')}>
            {userName}
          </figcaption>
        </figure>
      </div>
      <div className="forum-post__text-wrapper">
        <div className="forum-post__text">{text}</div>
        <div className="forum-post__info">
          <div className="forum-post__reactions">
            <div className="forum-post__likes">
              <div
                className={classNames('reaction', 'reaction-like', myLike && 'reaction-like_active')}
                onClick={handleLike}
              ></div>
              <div className="reaction-count">{likesCount}</div>
            </div>
            <div className="forum-post__dislikes">
              <div
                className={classNames('reaction', 'reaction-dislike', myDislike && 'reaction-dislike_active')}
                onClick={handleDislike}
              ></div>
              <div className="reaction-count">{dislikesCount}</div>
            </div>
          </div>
          <div>
            <time className="forum-post__date">{postDate}</time>
            <div className="forum-post__response">
              <div className="forum-post__open-response" onClick={toggleResponse}>
                Ответить
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenedResponse && (
        <>
          <div className="placeholder"></div>
          <form className="forum-post__response-form" onSubmit={handleResponse}>
            <textarea ref={responseRef} className="forum-post__response-textarea"></textarea>
            <Button type="submit" className="forum-post__response-button">
              Отправить
            </Button>
          </form>
        </>
      )}
    </li>
  );
};
