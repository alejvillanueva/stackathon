import React, { useEffect, useState } from 'react';
import { getTopArtists } from '../store/artists';
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
const TOP_ARTIST_API = 'https://api.spotify.com/v1/me/top/artists?limit=10';

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

function Home() {
  const [topArtists, setTopArtists] = useState([]);
  useEffect(() => {
    const getTopArtists = async () => {
      const artists = await axios.get(TOP_ARTIST_API, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            'spotify_token'
          )}`,
        },
      });
      const { items } = artists.data;
      setTopArtists(items);
    };

    getTopArtists();
  }, []);
  const [spacing, setSpacing] = React.useState(4);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  console.log(topArtists);
  return (
    <div>
      <Typography
        className={classes.control}
        align="center"
        variant="h2"
        color="primary"
      >
        Your Top Artists
      </Typography>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {topArtists.map((artist, idx) => (
              <Grid key={idx} item>
                <Card className={classes.paper}>
                  <CardActionArea>
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

export default Home;
