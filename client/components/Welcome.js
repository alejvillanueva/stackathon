import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import qs from 'qs';
import {
  Button,
  Typography,
  Grid,
  Card,
  makeStyles,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    maxWidth: '50%',
    minWidth: '25%',
    minHeight: '20vh',
    display: 'flex',
    fontWeight: '100',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px',
    borderRadius: '5px',
    boxShadow: '20px 15px 20px -10px rgb(199,37,32)',
  },
});

function Welcome({ location }) {
  console.log(location);
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loginThroughSpotify = () => {
      const token = qs.parse(location.pathname);
      if (token['/access_token']) {
        window.localStorage.setItem('spotify_token', token['/access_token']);
      }
    };

    loginThroughSpotify();
    if (window.localStorage.getItem('spotify_token') !== 'undefined') {
      setLoggedIn(true);
    }
  }, [location.pathname]);
  if (loggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <Grid className={classes.root} alignItems="center" justify="center">
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h2" color="secondary" fontS>
            Explorify
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            <a href="/login">Log In With Spotify</a>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Welcome;
