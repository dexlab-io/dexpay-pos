import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import config from './config';
import * as serviceWorker from './utils/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
// if (config.debug) {
//   serviceWorker.unregister();
// } else {
//   serviceWorker.register();
// }
