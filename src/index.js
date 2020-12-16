// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App.react';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

// Add support for locales: weekdays, months, ...
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const root = document.getElementById('root');

// Check for null or undefined just in case
if (root != null) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root,
  );
}
