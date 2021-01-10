import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  container: {
    padding: theme.spacing(1)
  },
  banner: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    margin: '0 auto'
  }
}));

const Title = props => {
  const { className, title, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(className)}>
      <div className={classes.container}>
        <Grid
          alignItems="center"
          className={classes.banner}
          container
          justify="center"
          spacing={1}>
          <Typography
            color="inherit"
            style={{ textAlign: 'center', fontWeight: 900 }}
            variant="h3">
            {title}
          </Typography>
        </Grid>
      </div>
    </div>
  );
};

Title.propTypes = {
  className: PropTypes.string
};

export default Title;
