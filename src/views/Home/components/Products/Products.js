import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { Product } from 'components';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    backgroundImage: 'linear-gradient(to top,#7900EC 35%, #CC0DF9 )'
  },
  inner: {
    maxWidth: '100%',
    [breakpoints.only('xs')]: {
      padding: spacing(1, 2)
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'center',
      padding: spacing(2, 15)
    }
  },
  media: {
    '& img': {
      width: '100%',
      height: 'auto'
    }
  }
}));

const Products = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.inner}>
        <Grid alignItems="center" container justify="space-between" spacing={2}>
          <Grid
            alignItems="center"
            direction="row"
            item
            justify="center"
            xs={12}>
            <Typography
              gutterBottom
              style={{ textAlign: 'center', color: 'white' }}
              variant="h2">
              Our Services & Products
            </Typography>
            <Typography
              style={{ textAlign: 'center', color: 'white' }}
              variant="subtitle2">
              We supply you items that will make your Sexual and reproductive
              health, more enjoyable.
            </Typography>
          </Grid>
          <Grid
            alignItems="center"
            className={classes.header}
            container
            direction="row"
            item
            justify="center"
            sm={12}
            spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Product key={i} />
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Products.propTypes = {
  className: PropTypes.string
};

export default Products;
