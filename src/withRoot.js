import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#64B5F6'
    }
  },
  background: {
    backgroundColor: '#62bbd3',
    backgroundImage: 'linear-gradient(30deg, #80c9dd 12%, transparent 12.5%, transparent 87%, #80c9dd 87.5%, #80c9dd),linear-gradient(150deg, #80c9dd 12%, transparent 12.5%, transparent 87%, #80c9dd 87.5%, #80c9dd),linear-gradient(30deg, #80c9dd 12%, transparent 12.5%, transparent 87%, #80c9dd 87.5%, #80c9dd),linear-gradient(150deg, #80c9dd 12%, transparent 12.5%, transparent 87%, #80c9dd 87.5%, #80c9dd),linear-gradient(60deg, #d5eaf0 25%, transparent 25.5%, transparent 75%, #d5eaf0 75%, #d5eaf0), linear-gradient(60deg, #d5eaf0 25%, transparent 25.5%, transparent 75%, #d5eaf0 75%, #d5eaf0)',
    backgroundSize: '40px 70px',
    backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    padding: '0 10px'
  },
  container: {
    backgroundColor: 'white',
    maxWidth: '350px',
    minWidth: '200px',
    display: 'flex',
    margin: '10px auto'
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;