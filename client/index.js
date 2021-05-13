import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Main from './components/Main';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1db954',
      light: '#5BC680',
      dark: '#388e3c',
    },
    secondary: {
      main: '#BA231E',
      light: '#C72520',
      dark: '#A11E1A',
    },
  },
  shape: {
    borderRadius: 25,
  },

  typography: {
    button: {
      fontWeight: 700,
    },
  },
});

render(
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>,
  document.querySelector('#app')
);
