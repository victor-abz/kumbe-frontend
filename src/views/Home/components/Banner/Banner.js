import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  stats: {
    backgroundColor: '#06633F',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1)
  },
  banner: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    margin: '0 auto'
  }
}));

const Banner = props => {
  const { className, ...rest } = props;
  const { t } = useTranslation()

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >     
      <div className={classes.stats}>
        <Grid
          alignItems="center"
          className={classes.banner}
          container
          justify="center"
          spacing={1}
        >
          <Grid
            item
          >
            <Typography
              color="inherit"
              style={{ textAlign: 'center'}}
              variant="h4"
            >
              {t('top_bar:toll')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="inherit"
              style={{ textAlign: 'center', fontWeight: 900}}
              variant="h2"
            >
              3530
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
