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
  Checkbox,
  Link,
} from '@material-ui/core';
import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CloseIcon from '@material-ui/icons/Close';

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

  info: {
    position: 'absolute',
    height: '50%',
    backgroundColor: 'rgba(255,255,255,.8)',
    border: '2px solid #5BC680',
    padding: theme.spacing(3, 3, 3),
    justifyContent: 'center',
    overflow: 'auto',
    textAlign: 'center',
  },

  display: {
    margin: '15px',
  },

  button: {
    marginTop: '25px',
    marginLeft: '25px',
  },

  copyButton: {
    marginTop: '15px',
    marginBottom: '25px',
  },

  links: {
    color: 'rgb(38, 166, 91)',
    fontWeight: '700',
  },
}));

function NewPlaylist({ songs, artistName, handleClose }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [topSongs] = useState(songs);
  const [playlistName, setPlaylistName] = useState(
    `${artistName} Top Related Songs`
  );
  const [publicList, setPublicList] = useState(true);
  const [playlistData, setPlaylistData] = useState({ url: '', uri: '' });

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const playlistToCreate = {
      name: playlistName,
      public: publicList,
      topSongs,
      token: window.localStorage.getItem('spotify_token'),
    };
    const playlistInfo = (
      await axios.post('/spotify/create-playlist', playlistToCreate)
    ).data;

    setPlaylistData({ ...playlistInfo });
  };

  const handleChange = (ev) => {
    setPlaylistName(ev.target.value);
  };

  return playlistData.url ? (
    <div style={modalStyle} className={classes.info}>
      <Typography className={classes.display} variant="h5">
        Your playlist has been created!
      </Typography>
      <Link
        className={classes.links}
        href={`${playlistData.url}`}
        onClick={(event) => event.preventDefault()}
        variant="body2"
        target="_blank"
        rel="noreferrer"
      >
        {playlistData.url}
      </Link>
      <br />
      <CopyToClipboard text={playlistData.url}>
        <Button className={classes.copyButton} variant="outlined">
          Copy
        </Button>
      </CopyToClipboard>

      <br />
      <img
        className={classes.display}
        src={`https://scannables.scdn.co/uri/plain/png/000000/white/300/${playlistData.uri}`}
      />
      <br />
      <Link component="button" variant="body2" onClick={handleClose}>
        <CloseIcon fontSize="large" color="primary" />
      </Link>
    </div>
  ) : (
    <div style={modalStyle} className={classes.card}>
      <Typography variant="h4">Top Songs Playlist</Typography>
      <List>
        {topSongs.map((song) => {
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
