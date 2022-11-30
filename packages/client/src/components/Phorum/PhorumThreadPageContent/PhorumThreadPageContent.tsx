import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { getPostsForTopic } from '../../../utils/backEndApi';
import { PhorumPostList } from '../PhorumPostList/PhorumPostList';
import { PhorumReply } from '../PhorumReply/PhorumReply';
import './PhorumThreadPageContent.scss';

export const PhorumThreadPageContent: FC = () => {
  const [isNewPost, setIsNewPost] = useState(false);
  const topics = useAppSelector((state) => state.forum.topics);
  const location = useLocation();
  const threadId = Number(location.hash.slice(1));
  const title = topics.rows.map((row) => {
    if (row.id === threadId) {
      return row.title;
    }
  });
  const endRef = useRef<null | HTMLDivElement>(null);

  const [postsRaw, setPostsRaw] = useState({ count: 0, rows: [] });
  useEffect(() => {
    (async () => {
      const res = await getPostsForTopic(threadId);
      setPostsRaw(await res.json());
      if (isNewPost) {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
        setIsNewPost(false);
      }
    })();
  }, [threadId, isNewPost]);

  const getNewPost = useCallback(() => {
    setIsNewPost(true);
  }, []);

  // почему-то перестали работать переносы строк

  return (
    <div className="phorum-thread-page-content">
      <h3 className="phorum-thread-page-content__header">{title}</h3>
      <div className="phorum-thread-page-content__thread">
        {postsRaw.count > 0 && <PhorumPostList {...postsRaw.rows} />}
        <div ref={endRef} />
      </div>
      <PhorumReply topicID={threadId} getDataUP={getNewPost} />
    </div>
  );
};
