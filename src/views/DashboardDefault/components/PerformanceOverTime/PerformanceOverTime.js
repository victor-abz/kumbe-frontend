import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';

import { GenericMoreButton } from 'components';
import { Chart } from './components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {},
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginLeft: theme.spacing(1)
    }
  },
  inner: {
    height: 375,
    minWidth: 500
  },
  chart: {
    height: '100%'
  }
}));

const PerformanceOverTime = props => {
  const { className, pageviews, ...rest } = props;

  let labels = [],
    values = [];
  if (pageviews.length > 0) {
    const vals = pageviews[0][Object.keys(pageviews[0])[0]];
    labels = vals.rows.map(val => val[0]);
    values = vals.rows.map(val => val[1]);
  }
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={<GenericMoreButton />}
        title="Performance This Month"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Chart className={classes.chart} data={values} labels={labels} />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

PerformanceOverTime.propTypes = {
  className: PropTypes.string
};

export default PerformanceOverTime;
