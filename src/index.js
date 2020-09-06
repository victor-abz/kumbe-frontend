import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LinearProgress } from '@material-ui/core';

ReactDOM.render((<Suspense fallback={<LinearProgress />}> <App /></Suspense>), document.getElementById('root'));

serviceWorker.unregister();
