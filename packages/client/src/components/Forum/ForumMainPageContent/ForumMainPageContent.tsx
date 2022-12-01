import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { getTopics, newTopic } from '../../../redux/actions/forumActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getTopicList } from '../../../utils/backEndApi';
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
    const message = textAreaElem.current?.value || '';
    const authorID = userProfile.id;
    await dispatch(newTopic({ title, authorID, message }));
    setFetched(false);
    setIsNew(false);
  }, [dispatch, userProfile.id]);

  useEffect(() => {
    if (!isFetched) {
      (async () => {
        const res = await getTopicList();
        await dispatch(getTopics(await res.json()));
      })();
      setFetched(true);
    }
  }, [dispatch, topics, isFetchedTopics, isNew, isFetched]);

  return (
    <div className="forum-main-page-content">
      <h3 className="forum-main-page-content__header">{title}</h3>
      <div className="new-thread">
        <div className="new-thread__link" onClick={() => (isNew ? setIsNew(false) : setIsNew(true))}>
          Новая тема
        </div>{' '}
      </div>
      <ForumMainListHeader />
      {topics.rows.length > 0 && <ForumThreadList {...topics.rows} />}

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
