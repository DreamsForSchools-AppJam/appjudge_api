import React from 'react';
import ReactDOM from 'react-dom';

import { Route, BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import JudgeHome from './components/JudgeHome';
import AdminHome from './components/AdminHome';
import JudgeLogin from './components/Login/JudgeLogin';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={JudgeLogin} />
            <Route exact path="/admin" component={AdminHome} />
            <Route 
            path="/home/judge" 
            render={(props) => <JudgeHome {...props} />} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
