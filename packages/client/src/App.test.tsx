import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const appContent = 'Вот тут будет жить ваше приложение :)';

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') } as Response));

test('Example test', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(screen.getByText(appContent)).toBeDefined();
});
