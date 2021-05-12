import axios from 'axios';

const LOAD_TOP_ARTISTS = 'TOP_ARTISTS';
const TOP_ARTIST_API = 'https://api.spotify.com/v1/me/top/artists?limit=10';

const _getTopArtists = (artists) => {
  return {
    type: LOAD_TOP_ARTISTS,
    artists,
  };
};

export const getTopArtists = () => {
  return async (dispatch) => {
    console.log(window.localStorage.getItem('spotify_token'));

    const artists = await axios.get(TOP_ARTIST_API, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('spotify_token')}`,
      },
    });
    const { items } = artists.data;
    dispatch(_getTopArtists(items));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_TOP_ARTISTS: {
      return [...action.artists];
    }
    default: {
      return state;
    }
  }
};
