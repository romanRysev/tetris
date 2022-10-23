import React, { FC, useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../Button/Button';
import './PhorumReply.scss';

type ReplyProps = {
  buttonContent?: string;
  InputPlaceholder?: string;
  InputErrorText?: string;
  getDataUp: (text: string) => void;
};

export const PhorumReply: FC<ReplyProps> = ({
  buttonContent = 'Отправить',
  InputPlaceholder = 'Ваш ответ...',
  getDataUp,
}) => {
  const location = useLocation();
  const threadId = location.pathname;
  const textAreaElem = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const savedMessage = localStorage.getItem(`${threadId}-saved-message`);
  const [isFilled, setFilled] = useState(savedMessage ? true : false);
  const checkFilled = useCallback(() => {
    setFilled(textAreaElem.current.value ? true : false);
  }, []);
  const saveMessage = useCallback(() => {
    localStorage.setItem(`${threadId}-saved-message`, textAreaElem.current.value);
  }, [threadId]);

  return (
    <div className="phorum-reply">
      <div className="placeholder"></div>
      <form className="form phorum-reply__form">
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
          <Button
            className="reply__button"
            onClick={() => {
              getDataUp(textAreaElem.current.value);
              textAreaElem.current.value = '';
            }}
            disabled={isFilled ? false : true}
          >
            {buttonContent}
          </Button>
        </div>
      </form>
    </div>
  );
};
