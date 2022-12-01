import React, { FC, FormEvent, useCallback, useRef, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { makeNewPost } from '../../../utils/backEndApi';
import { Button } from '../../Button/Button';
import './ForumReply.scss';

type ReplyProps = {
  buttonContent?: string;
  InputPlaceholder?: string;
  InputErrorText?: string;
  topicID: number;
  getDataUP?: () => void;
};

export const ForumReply: FC<ReplyProps> = ({
  buttonContent = 'Отправить',
  InputPlaceholder = 'Ваш ответ...',
  ...props
}) => {
  const { topicID, getDataUP } = props;
  const userProfile = useAppSelector((state) => state.auth.user);
  const textAreaElem = useRef<HTMLTextAreaElement>(null);
  const savedMessage = localStorage.getItem(`${topicID}-saved-message`);
  const [isFilled, setFilled] = useState(savedMessage ? true : false);
  const formRef = useRef<HTMLFormElement>(null);
  const checkFilled = useCallback(() => {
    setFilled(textAreaElem.current?.value ? true : false);
  }, []);
  const saveMessage = useCallback(() => {
    localStorage.setItem(`${topicID}-saved-message`, textAreaElem.current?.value || '');
  }, [topicID]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const message = textAreaElem.current?.value.replace(/<[^>]+(>|$)/g, ' ') || '';

      await makeNewPost({
        authorID: userProfile.id,
        topicID,
        message: message,
      });

      localStorage.removeItem(`${topicID}-saved-message`);
      formRef.current?.reset();
      if (getDataUP) getDataUP();
    },
    [userProfile.id, topicID, getDataUP],
  );

  return (
    <div className="forum-reply">
      <div className="placeholder"></div>
      <form className="form forum-reply__form" onSubmit={handleSubmit} ref={formRef}>
        <div className="reply">
          <textarea
            ref={textAreaElem}
            className="reply__textarea"
            placeholder={InputPlaceholder}
            defaultValue={savedMessage ?? undefined}
            onChange={checkFilled}
            onBlur={saveMessage}
          ></textarea>
        </div>
        <div className="reply__button_area">
          <label className="reply__label">
            <input type="file" className="reply__input_hidden"></input>
          </label>
          <Button className="reply__button" disabled={isFilled ? false : true}>
            {buttonContent}
          </Button>
        </div>
      </form>
    </div>
  );
};
