import React, { useEffect, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page } from 'components';
import { Grid, Hidden } from '@material-ui/core';
import Sidebar from './components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { getCategories } from 'redux/actions/category';
import { LinearProgress } from '@material-ui/core';
import { renderRoutes } from 'react-router-config';
import { httpSocket } from 'utils/http';

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

const Forum = props => {
  const { route, t } = props;
  const classes = useStyles();
  const {
    categoryGet: { loaded, categories },
    auth: { user }
  } = useSelector(({ categoryGet, auth }) => ({ categoryGet, auth }));

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    const name = `${user.firstName} ${user.lastName}`;
    httpSocket.emit('join', { userId: user.id, name }, () => {});
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
            <Suspense fallback={<LinearProgress />}>
              {renderRoutes(route.routes, { t })}
            </Suspense>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Forum;
