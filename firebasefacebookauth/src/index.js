import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FBAuth} from './fbauth';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FBAuth />, document.getElementById('root'));
registerServiceWorker();
