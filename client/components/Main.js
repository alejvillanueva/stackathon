import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import Auth from './Auth';
function Main() {
  return (
    <Router>
      <div id="container">
        <Route exact component={Welcome} path="/" />
        <Route exact component={Auth} path="/auth/:token" />
        <Route exact component={Home} path="/home" />
      </div>
    </Router>
  );
}

export default Main;
