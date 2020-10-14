import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page } from 'components';
import { Grid, Paper, Hidden } from '@material-ui/core';
import Feed from './Feed';
import Sidebar from './components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { getCategories } from 'redux/actions/category';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto'
    // padding: theme.spacing(2)
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden'
  },
  scrollable: {
    overflow: 'auto'
    // padding: theme.spacing(1)
  }
}));

const Forum = () => {
  const classes = useStyles();
  const {
    categoryGet: { loaded, categories },
    auth: { user }
  } = useSelector(({ categoryGet, auth }) => ({ categoryGet, auth }));

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Page style={{ height: '100vh' }} title="Social Feed">
      <Grid className={classes.root} container>
        <Grid className={classes.container}>
          <Hidden smDown>
            <Grid
              className={classes.scrollable}
              // component={Paper}
              md={2}
              sm={12}>
              {loaded ? <Sidebar categories={categories} /> : null}
            </Grid>
          </Hidden>
          <Grid className={classes.scrollable} md={10} sm={12}>
            <Feed user={user} />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Forum;
