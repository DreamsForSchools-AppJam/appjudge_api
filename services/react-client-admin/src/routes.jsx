import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

/**
 * Import all page components here
 */
import App from './App';
import JudgeHome from './components/JudgeHome';
import SimpleExpansionPanel from './components/SimpleExpansionPanel'

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <BrowserRouter>
    <div>
      <Route path="/" component={App} />
      <Route path="/home" component={JudgeHome} />
      <Route path="/try" component={SimpleExpansionPanel} />
    </div>
  </BrowserRouter>
);