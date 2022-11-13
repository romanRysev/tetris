import React from 'react';
import { Button } from './Button';
import { render, screen } from '@testing-library/react';

const testText = 'test text';

test('Button component mounting', async () => {
  render(<Button className="test-button">{testText}</Button>);
  expect(screen.findByText(testText)).toBeDefined();
});

test('Button props passing', async () => {
  const res = render(
    <Button className="test-button" backgroundOpacity={true}>
      {testText}
    </Button>,
  );

  expect((res.container.firstChild as HTMLButtonElement).classList.contains('test-button')).toBe(true);
});
