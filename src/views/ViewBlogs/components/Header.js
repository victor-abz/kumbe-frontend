import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            Blogs
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default Header;
