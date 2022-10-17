import React, { FC } from 'react';
import { Button } from '../../../Button/Button';
import { Input } from '../../../Input/Input';
import './Reply.scss';

type ReplyProps = {
  buttonContent?: string;
  InputPlaceholder?: string;
  InputErrorText?: string;
};

export const Reply: FC<ReplyProps> = ({ buttonContent = 'Отправить', InputPlaceholder = 'Ваш ответ...' }) => {
  // TODO: поставить проверку на нал. сообщения и только тогда включать кнопку
  return (
    <div className="reply-wrapper">
      <div className="placeholder"></div>
      <form className="reply">
        <div className="reply__reply">
          <textarea className="reply__textarea" placeholder={InputPlaceholder}></textarea>
        </div>
        <div className="reply__button_area">
          <Input type="file" className="reply__input_hidden" />
          <Button
            className="reply__button"
            onClick={() => {
              // TODO: поставить проверку на наличие сообщения?
              console.log('ТУТ БУДЕТ ОТПРАВКА СООБЩЕНИЯ');
            }}
          >
            {buttonContent}
          </Button>
        </div>
      </form>
    </div>
  );
};
