// @flow strict

import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App.react';

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
