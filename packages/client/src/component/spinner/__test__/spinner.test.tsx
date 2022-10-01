import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Spinner } from '../spinner';

test('loads and displays Spinner component', async () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
});

test('Spinner customize', async () => {
  const { container } = render(<Spinner className="bazinga" color="warning" component="h3" size="sm" variant="grow" />);
  expect(container).toMatchSnapshot();
  expect(container.firstChild).toHaveClass('bazinga');
  expect(container.firstChild).toHaveClass('spinner-grow');
  expect(container.firstChild).toHaveClass('text-warning');
  expect(container.firstChild).toHaveClass('spinner-grow-sm');
});
