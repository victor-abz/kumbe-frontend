import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page } from 'components';
import { Grid, Paper } from '@material-ui/core';
import Feed from './Feed';
import Sidebar from './components/Sidebar/Sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  sidebar: {
    marginBottom: 'auto',
    padding: theme.spacing(1)
  }
}));

const Forum = () => {
  const classes = useStyles();
  return (
    <Page title="Social Feed">
      <Grid className={classes.root} container>
        <Grid className={classes.sidebar} component={Paper} item md={2} xs={12}>
          <Sidebar />
        </Grid>
        <Grid item md={10} xs={12}>
          <Feed />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Forum;
