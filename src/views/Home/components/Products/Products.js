import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { Product } from 'components';
import { useSelector } from 'react-redux';
import { getProducts } from 'redux/actions/product';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const classes = useStyles();
  const { products } = useSelector(({ productsGet }) => productsGet);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.inner}>
        <Grid alignItems="center" container justify="space-between" spacing={2}>
          <Grid
            alignItems="center"
            container
            direction="row"
            item
            justify="center"
            xs={12}>
            <Typography
              align="center"
              gutterBottom
              style={{ color: 'white' }}
              variant="h2">
              {t('home:products_title')}
            </Typography>
            <Typography
              align="center"
              style={{ color: 'white' }}
              variant="subtitle2">
              {t('home:products_sub_title')}
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
            {products.map((prod, prodIdx) => (
              <Product key={prodIdx} {...prod} />
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
