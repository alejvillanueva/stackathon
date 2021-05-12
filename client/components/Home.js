import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import qs from 'qs';

function Home({ location }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      const data = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            'spotify_token'
          )}`,
        },
      });
      console.log(data.data);
    };

    getSongs();
  }, []);
  return (
    <div style={{ color: 'white' }}>
      <Link to="/playlists">Playlist</Link>
    </div>
  );
}

export default Home;
