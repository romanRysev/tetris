import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { getTopics } from '../../../redux/actions/forumActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { changeLastReply, getTopicList, makeNewPost, makeNewTopic } from '../../../utils/backEndApi';
import { Popup } from '../../Popup/Popup';
import { ForumMainListHeader } from '../ForumMainListHeader/ForumMainListHeader';
import { ForumThreadList } from '../ForumThreadList/ForumThreadList';
import './ForumMainPageContent.scss';

type ForumThreadListProps = {
  title?: string;
};

export const ForumMainPageContent: FC<ForumThreadListProps> = ({ title = 'Форум' }) => {
  // TODO прикрутить валидацию
  const [isNew, setIsNew] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const inputElem = useRef<HTMLInputElement>(null);
  const textAreaElem = useRef<HTMLTextAreaElement>(null);
  const userProfile = useAppSelector((state) => state.auth.user);
  const topics = useAppSelector((state) => state.forum.topics);
  const isFetchedTopics = useAppSelector((state) => state.forum.isTopicsFetched);

  const dispatch = useAppDispatch();

  const handleNewThread = useCallback(async () => {
    const title = inputElem.current?.value || 'Новая тема';
    const message = textAreaElem.current?.value || undefined;
    const authorID = userProfile.id;
    try {
      const topic = await makeNewTopic({ title, authorID, message });
      if (message) {
        const post = await makeNewPost({
          authorID: topic.authorID,
          topicID: topic.id,
          message: message,
        });
        await changeLastReply(post.id, topic.id);
      }
    } catch (error) {
      console.log(error);
    }
    setFetched(false);
    setIsNew(false);
  }, [userProfile.id]);

  const toggleNewThreadForm = useCallback(() => {
    setIsNew(!isNew);
  }, [isNew]);

  useEffect(() => {
    if (!isFetched) {
      (async () => {
        const res = await getTopicList();
        await dispatch(getTopics(res));
      })();
      setFetched(true);
    }
  }, [dispatch, topics, isFetchedTopics, isNew, isFetched]);

  return (
    <div className="forum-main-page-content">
      <h3 className="forum-main-page-content__header">{title}</h3>
      <div className="new-thread">
        <div className="new-thread__link" onClick={toggleNewThreadForm}>
          Новая тема
        </div>{' '}
      </div>
      <ForumMainListHeader />
      {topics.rows.length && <ForumThreadList {...topics.rows} />}

      {!!isNew && (
        <Popup
          title="Новая тема"
          buttonText="Создать новую тему"
          onClick={handleNewThread}
          showValidation={false}
          validationText=""
          className="new-thread__popup"
        >
          <input type="text" placeholder="Название темы" ref={inputElem} />
          <textarea
            ref={textAreaElem}
            className="new-thread__textarea"
            placeholder="Ваше первое сообщение..."
          ></textarea>
        </Popup>
      )}
      {!!isNew && <div className="popup-background" onClick={() => setIsNew(false)}></div>}
    </div>
  );
};
