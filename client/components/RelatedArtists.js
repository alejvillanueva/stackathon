import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  makeStyles,
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import NewPlaylist from './NewPlaylist';

const ARTIST_API = 'https://api.spotify.com/v1/artists/';
const RELATED_ARTISTS = '/related-artists';
const TOP_SONGS = '/top-tracks?market=US';

import qs from 'qs';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    width: 300,
    boxShadow: '20px 15px 20px -10px rgba(199,37,32, 0.8)',
  },
  control: {
    padding: theme.spacing(5),
  },

  media: {
    height: 160,
  },
}));

function RelatedArtists({ location }) {
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [artist, setArtist] = useState({ name: '', id: '' });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const [name, id] = location.pathname.split('/').splice(2);
    setArtist({ name, id });
    const getRelatedArtists = async () => {
      const { artists } = (
        await axios.get(ARTIST_API + id + RELATED_ARTISTS, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'spotify_token'
            )}`,
          },
        })
      ).data;
      setRelatedArtists(artists);

      const newTopSongs = [];
      artists.forEach(async (artist) => {
        const { tracks } = (
          await axios.get(ARTIST_API + artist.id + TOP_SONGS, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                'spotify_token'
              )}`,
            },
          })
        ).data;
        newTopSongs.push(tracks[0]);
      });
      setTopSongs(newTopSongs);
      //const { items } = artists.data;
    };

    getRelatedArtists();
  }, []);
  const [spacing, setSpacing] = React.useState(4);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <div>
      <Typography
        className={classes.control}
        align="center"
        variant="h2"
        color="primary"
      >
        Related Artists to: {artist.name}
      </Typography>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {relatedArtists.map((artist, idx) => (
              <Grid key={idx} item>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={artist.images[0].url}
                  />
                  <CardContent>
                    <Typography variant="h5" color="secondary" component="h3">
                      {artist.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Genres: {artist.genres[0]}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      target="_blank"
                      href={artist.external_urls.spotify}
                    >
                      Check Out on Spotify
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <div>
        <button type="button" onClick={handleOpen}>
          Open Modal
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <NewPlaylist songs={topSongs} artistName={artist.name} />
        </Modal>
      </div>
    </div>
  );
}

export default RelatedArtists;
