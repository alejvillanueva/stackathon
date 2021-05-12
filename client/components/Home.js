import React from 'react';
import Welcome from './Welcome';

function Home({ location }) {
  return (
    <div id="login">
      <Welcome location={location} />
    </div>
  );
}

export default Home;
