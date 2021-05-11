const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  spotify_secret: process.env.SPOTIFY_CLIENT_SECRET,
  spotify_id: process.env.SPOTIFY_CLIENT_ID,
  setlist_api: process.env.SETLIST_API_KEY,
  scopes: process.env.SCOPES,
};
