const router = require('express').Router();
const axios = require('axios');
router.post('/create-playlist', async (req, res, next) => {
  try {
    const { name, public, topSongs, token } = req.body;

    const { id } = (
      await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;

    const createPlaylist = (
      await axios.post(
        `https://api.spotify.com/v1/users/${id}/playlists`,
        {
          name,
          public,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;

    const playlistId = createPlaylist.id;
    const uri = createPlaylist.uri;
    const url = createPlaylist.external_urls.spotify;
    const uris = topSongs.map((song) => song.uri);

    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.send({ uri, url });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
