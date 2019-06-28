import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import App from './App';
// import config from './config';
import * as serviceWorker from './utils/serviceWorker';

Sentry.init({
  dsn: 'https://e8b127fff69b4cd1a4cc10f1b0c67377@sentry.io/1492683'
});

ReactDOM.render(<App />, document.getElementById('root'));

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
// if (config.debug) {
//   serviceWorker.unregister();
// } else {
//   serviceWorker.register();
// }
