import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'node-fetch';

import './index.scss';
import App from './App';

global.fetch = fetch;

ReactDOM.render(<App />, document.getElementById('root'));


