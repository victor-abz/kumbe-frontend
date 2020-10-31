import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000
  },
  logo: {
    width: 200,
    maxWidth: '100%'
  }
}));

export const SplashScreen = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center" mb={6}>
        <img
          alt="Logo"
          className={classes.logo}
          src="/images/logos/logo--normal.svg"
        />
      </Box>
      {message === '' && <CircularProgress />}
      {message && <Typography variant="h4">{message}</Typography>}
    </div>
  );
};
