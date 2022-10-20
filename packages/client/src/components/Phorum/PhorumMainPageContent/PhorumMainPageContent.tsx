import React, { FC, useRef, useState } from 'react';
import { dummyUser } from '../../../consts/dummyData';
import { makeUserNameFromUser } from '../../../utils/makeUserProps';
import { Popup } from '../../Popup/Popup';
import { PhorumMainListHeader } from '../PhorumMainListHeader/PhorumMainListHeader';
import { PhorumThreadList } from '../PhorumThreadList/PhorumThreadList';
import { ThreadListItemProps } from '../PhorumThreadList/__Item/PhorumThreadList__Item';
import './PhorumMainPageContent.scss';

type PhorumThreadListProps = {
  title?: string;
};

const dummyList: ThreadListItemProps[] = [
  {
    thread: 'Как вы ставите палку - горизонтально или вертикально?',
    author: 'Душка Фулгрим!!',
    startDate: '28-09-22',
    pageCount: 13,
    replies: '237 ответов',
    lastReplyUser: 'Сангвиний',
    lastReplyDate: '30 сен 2022 18:53',
  },
  {
    thread: 'На какой планете вас нашли!!!',
    pageCount: 5,
    author: 'Фабиуссс',
    startDate: '26-09-22',
    replies: '45 ответов',
    lastReplyUser: 'Перт Железная Башка',
    lastReplyDate: '30 сен 2022 17:42',
  },
  {
    thread: 'Киса ты с какова горада?',
    pageCount: 2,
    author: 'Злютик Незабутик',
    startDate: '27-09-22',
    replies: '45 ответов',
    lastReplyUser: 'Феррус',
    lastReplyDate: '28 сен 2022 13:02',
  },
];

export const PhorumMainPageContent: FC<PhorumThreadListProps> = ({ title = 'Форум' }) => {
  // TODO прикрутить валидацию
  const [list, setList] = useState(dummyList);
  const [isNew, setIsNew] = useState(false);
  const popupElem = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputElem = useRef() as React.MutableRefObject<HTMLInputElement>;
  const textAreaElem = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  return (
    <div className="phorum-main-page-content">
      <h3 className="phorum-main-page-content__header">{title}</h3>
      <div className="new-thread">
        <div className="new-thread__link" onClick={() => (isNew ? setIsNew(false) : setIsNew(true))}>
          Новая тема
        </div>{' '}
      </div>
      <PhorumMainListHeader />
      <PhorumThreadList {...list} />

      {!!isNew && (
        <Popup
          popupRef={popupElem}
          title="Новая тема"
          buttonText="Создать новую тему"
          onClick={() => {
            const threadName = inputElem.current.value;
            // TODO передавать данные для новой страницы
            const userName = makeUserNameFromUser(dummyUser);
            const date = new Date();
            list.push({
              thread: threadName,
              pageCount: 0,
              author: userName,
              startDate: date.toLocaleDateString('ru'),
              replies: '0 ответов',
              lastReplyUser: userName,
              lastReplyDate: date.toLocaleDateString('ru'),
            });
            // тут я хотела поинтересоваться - так можно делать, или это совсем дно? Так в список темы добавляются, потом это будет по-другому (наверное)
            setList(list);
            setIsNew(false);
          }}
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
