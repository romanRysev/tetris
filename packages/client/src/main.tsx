import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <App />
  </Provider>,
);
