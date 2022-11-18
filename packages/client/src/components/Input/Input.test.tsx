import React, { useState } from 'react';
import { Input } from './Input';
import { fireEvent, render, screen } from '@testing-library/react';
import { minLengthRule, requiredRule, validation } from '../../helpers/validator';

const minLength = 5;
function TestInput() {
  const [errorText, setErrorText] = useState('');
  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorText(validation(e.target.value, [minLengthRule(minLength), requiredRule]).errorMessages.join('\n'));
    console.log(e.target.value, errorText);
  };

  return <Input className="test-input" aria-label="test-input" onChange={onChange} errorText={errorText} />;
}

const setup = () => {
  const utils = render(<TestInput />);
  const input = utils.getByLabelText('test-input');
  return {
    input,
    ...utils,
  };
};

test('Input validity', async () => {
  const { input } = setup();

  fireEvent.change(input, { target: { value: '123456' } });
  expect(screen.queryByText(`Минимум ${minLength} символов.`)).toBeNull();
  expect(screen.queryByText('Поле обязательное')).toBeNull();

  fireEvent.change(input, { target: { value: '123' } });
  expect(screen.queryByText(`Минимум ${minLength} символов.`)).toBeTruthy();

  fireEvent.change(input, { target: { value: '' } });
  expect(screen.queryByText('Поле обязательное')).toBeTruthy();
});
