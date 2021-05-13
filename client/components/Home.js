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
const TOP_ARTIST_API = 'https://api.spotify.com/v1/me/top/artists?limit=10';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    height: 300,
    width: 300,
    boxShadow: '20px 15px 20px -10px rgba(91,198,78, 0.6)',
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
                <Card className={classes.card}>
                  <CardActionArea
                    component={Link}
                    to={`/artist/${artist.name}/${artist.id}`}
                  >
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
    </div>
  );
}

export default Home;
