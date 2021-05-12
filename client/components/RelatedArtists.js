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
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
const ARTIST_API = 'https://api.spotify.com/v1/artists/';
const RELATED_ARTISTS = '/related-artists';
const TOP_SONGS = '/top-tracks?market=US';

import qs from 'qs';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 275,
    width: 275,
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

      artists.forEach(async (artist) => {
        const { tracks } = (
          await axios.get(ARTIST_API + id + TOP_SONGS, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                'spotify_token'
              )}`,
            },
          })
        ).data;
      });
      //add random songs to top songs

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
                <Card className={classes.paper}>
                  <CardActionArea component={Link} to={`/artsit/${artist.id}`}>
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
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RelatedArtists;
