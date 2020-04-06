import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import './index.css'
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker'
import history from './helper/history';

import App from './components/App'

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();