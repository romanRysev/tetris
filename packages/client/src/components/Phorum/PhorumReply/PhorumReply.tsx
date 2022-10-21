import React, { FC, useRef, useState } from 'react';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
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
  const textAreaElem = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const savedMessage = localStorage.getItem('saved-message');
  const [isFilled, setFilled] = useState(savedMessage ? true : false);
  const checkFilled = () => {
    if (!textAreaElem.current.value && !!isFilled) {
      setFilled(false);
    } else if (!!textAreaElem.current.value && !isFilled) {
      setFilled(true);
    }
  };
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
            onChange={() => {
              checkFilled();
            }}
            onBlur={() => {
              localStorage.setItem('saved-message', textAreaElem.current.value);
            }}
          ></textarea>
        </div>
        <div className="reply__button_area">
          <Input type="file" className="reply__input_hidden" />
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
