import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './app/store';
import App from './App';
import './index.css';


const element = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(element!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
