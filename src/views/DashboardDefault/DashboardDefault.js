import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { Page } from 'components';
import {
  Header,
  TotalBlogs,
  PageViews,
  TotalQuestions,
  LatestBlogs,
  QnWithNoAnswers,
  TotalPartners,
  PerformanceOverTime,
  UsersList
} from './components';
import { getAnalytics } from 'redux/actions/analytics';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const DashboardDefault = () => {
  const classes = useStyles();

  const {
    analyticsGet: { loading, loaded, analytics }
  } = useSelector(({ analyticsGet }) => ({ analyticsGet }));

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getAnalytics({});
    }
    return () => {
      mounted = false;
    };
  }, []);

  let pageViews = analytics.filter(analytic => analytic['Page Views']);
  let monthlyPageViews = analytics.filter(
    analytic => analytic['Page Views Monthly']
  );
  console.log('<>>>>>>>>', analytics);

  return (
    <Page className={classes.root} title="Default Dashboard">
      <Header />
      <Grid className={classes.container} container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <TotalBlogs />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <TotalPartners />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <QnWithNoAnswers />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <TotalQuestions />
        </Grid>
        {loading ? (
          //   <Loading />
          <>
            <Grid item lg={4} xs={12}>
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" height={10} width="40%" />
              <Skeleton animation="wave" height={120} />
            </Grid>
            <Grid item lg={8} xs={12}>
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" height={10} width="40%" />
              <Skeleton animation="wave" height={120} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item lg={4} xs={12}>
              <PageViews pageviews={pageViews} />
            </Grid>
            <Grid item lg={8} xs={12}>
              <PerformanceOverTime pageviews={monthlyPageViews} />
            </Grid>
          </>
        )}
        <Grid item lg={5} xl={4} xs={12}>
          <LatestBlogs />
        </Grid>
        <Grid item lg={7} xl={8} xs={12}>
          <UsersList />
        </Grid>
        {/* <Grid item lg={7} xl={8} xs={12}>
              <LatestProjects />
            </Grid> */}
      </Grid>
    </Page>
  );
};

export default DashboardDefault;
