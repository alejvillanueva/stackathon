import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  makeStyles,
  Modal,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core';
import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';
import axios from 'axios';

const toMins = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
function getModalStyle() {
  const top = 25;
  return {
    top: `${top}%`,
  };
}

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'absolute',
    width: '30%',
    height: '50%',
    backgroundColor: 'rgba(255,255,255,.8)',
    border: '2px solid #5BC680',
    padding: theme.spacing(3, 3, 3),
    justifyContent: 'center',
    overflow: 'auto',
  },
  button: {
    marginTop: '15px',
    marginLeft: '15px',
  },
}));

function NewPlaylist({ songs, artistName }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [topSongs] = useState(songs);
  const [playlistName, setPlaylistName] = useState(
    `${artistName} Top Related Songs`
  );
  const [publicList, setPublicList] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const playlistToCreate = {
      name: playlistName,
      public: publicList,
      topSongs,
      token: window.localStorage.getItem('spotify_token'),
    };
    await axios.post('/spotify/create-playlist', playlistToCreate);
  };

  const handleChange = (ev) => {
    setPlaylistName(ev.target.value);
  };

  useEffect(() => {
    console.log(songs);
  }, []);
  return (
    <div style={modalStyle} className={classes.card}>
      <Typography variant="h4">Top Songs Playlist</Typography>
      <List>
        {topSongs.map((song, index) => {
          return (
            <ListItem key={song.id}>
              <ListItemIcon>
                <AudiotrackRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary={song.name}
                secondary={`${song.artists[0].name} (${toMins(
                  song.duration_ms
                )})`}
              />
            </ListItem>
          );
        })}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          name="playlistName"
          label="playlist name"
          defaultValue={playlistName}
          onChange={handleChange}
        />
        <Button type="submit" className={classes.button} variant="outlined">
          create
        </Button>
        <br />
        <Typography variant="overline">Private?</Typography>
        <Checkbox
          name="playlistPublic"
          checked={!publicList}
          onChange={() => {
            setPublicList(!publicList);
          }}
        />
      </form>
    </div>
  );
}

export default NewPlaylist;
