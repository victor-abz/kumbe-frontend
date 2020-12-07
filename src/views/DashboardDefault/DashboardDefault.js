import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import moment from 'moment';

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

  var thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(new Date());

  const {
    analyticsGet: { loading, analytics }
  } = useSelector(({ analyticsGet }) => ({ analyticsGet }));

  const formattedDate = date => {
    if (moment.isMoment(date)) {
      date = moment().toDate(date);
    }
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`;
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAnalytics({
        startDate: formattedDate(startDate),
        endDate: formattedDate(endDate)
      });
    }
    return () => {
      mounted = false;
    };
  }, [startDate, endDate]);

  let pageViews = analytics.filter(analytic => analytic['Page Views']);
  let monthlyPageViews = analytics.filter(
    analytic => analytic['Page Views Monthly']
  );

  return (
    <Page className={classes.root} title="Default Dashboard">
      <Header
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
      />
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
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid item lg={4} xs={12}>
              <PageViews pageviews={pageViews} />
            </Grid>
            <Grid item lg={8} xs={12}>
              <PerformanceOverTime pageviews={monthlyPageViews} />
            </Grid>
          </React.Fragment>
        )}
        <Grid item lg={5} xl={4} xs={12}>
          <LatestBlogs />
        </Grid>
        <Grid item lg={7} xl={8} xs={12}>
          <UsersList />
        </Grid>
      </Grid>
    </Page>
  );
};

export default DashboardDefault;
