import React from 'react';
import App from './App';
import { act, queryByAttribute, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') } as Response));

test('App render', async () => {
  const res = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  await act(async () => {
    expect(queryByAttribute('id', res.container, 'app')).toBeTruthy();
  });
});
