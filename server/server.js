const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const app = express();
const qs = require('qs');

module.exports = app;
dotenv.config();

const redirect_uri =
  process.env.REDIRECT_URI || 'http://localhost:3000/callback';

const SPOTIFY_ID = process.env.SPOTIFY_CLIENT_ID;
const SCOPES = process.env.SCOPES;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res, next) => {
  try {
    const html = path.join(__dirname, '..', '/client/index.html');
    res.sendFile(html);
  } catch (error) {
    next(error);
  }
});

app.get('/login', (req, res, next) => {
  console.log(encodeURIComponent(redirect_uri));
  try {
    res.redirect(
      'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        SPOTIFY_ID +
        (SCOPES ? '&scope=' + encodeURIComponent(SCOPES) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirect_uri)
    );
  } catch (error) {
    next(error);
  }
});

app.get('/callback', async (req, res, next) => {
  try {
    const code = req.query.code;
    const grant_type = 'authorization_code';

    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        code,
        grant_type,
        redirect_uri,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;
    res.redirect(
      `http://localhost:3000/#/${qs.stringify({
        access_token,
        refresh_token,
      })}`
    );
  } catch (error) {
    next(error);
  }
});
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(error);
});
