import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  stats: {
    backgroundColor: '#06633F',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1)
  },
  statsInner: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    margin: '0 auto'
  }
}));

const Banner = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >     
      <div className={classes.stats}>
        <Grid
          alignItems="center"
          className={classes.statsInner}
          container
          justify="center"
          spacing={3}
        >
          <Grid
            item
          >
            <Typography
              color="inherit"
              gutterBottom
              variant="h2"
            >
              Call us on our toll free line 3530
            </Typography>
          </Grid>
         
        </Grid>
      </div>
    </div>
  );
};

Banner.propTypes = {
  className: PropTypes.string
};

export default Banner;
