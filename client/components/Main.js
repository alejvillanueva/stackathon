import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import Playlists from './Playlists';
function Main() {
  return (
    <Router>
      <div id="container">
        <Route component={Home} path="/" />
        <Route component={LoginPage} path="/home" />
        <Route component={Playlists} path="/playlists" />
      </div>
    </Router>
  );
}

export default Main;
