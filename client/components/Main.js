import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';

function Main() {
  return (
    <Router>
      <div id="container">
        <Route exact component={Home} path="/" />
        <Route exact component={LoginPage} path="/login" />
      </div>
    </Router>
  );
}

export default Main;
