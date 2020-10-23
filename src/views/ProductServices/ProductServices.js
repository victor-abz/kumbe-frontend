import { Page, Product, SearchBar } from 'components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { AddProductDialog } from './AddProductDialog';
import { getProducts } from 'redux/actions/product';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  inner: {
    maxWidth: '100%',
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1, 2)
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      padding: theme.spacing(2, 5)
    }
  },
  media: {
    '& img': {
      width: '100%',
      height: 'auto'
    }
  }
}));

const ProductSercices = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const {
    productsGet: { loading, products }
  } = useSelector(({ productsGet }) => ({
    productsGet
  }));
  useEffect(() => {
    getProducts();
  }, []);
  const handleFilter = () => {};
  const handleSearch = () => {};
  return (
    <Page className={classes.root} title={t('settings:page_header')}>
      <AddProductDialog
        open={openAddProduct}
        setOpen={() => setOpenAddProduct(false)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {t('settings:page_header')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpenAddProduct(true)}>
            {t('settings:add_btn')}
          </Button>
        </Grid>
      </Grid>
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <div className={classes.inner}>
        <Grid alignItems="center" container justify="space-between" spacing={1}>
          <Grid
            alignItems="center"
            className={classes.header}
            container
            direction="row"
            item
            justify="center"
            sm={12}
            spacing={2}>
            {loading ? (
              <Loading />
            ) : products.length ? (
              products.map((product, productIdx) => (
                <Product key={productIdx} {...product} />
              ))
            ) : (
              <NoDisplayData />
            )}
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};
export default ProductSercices;
