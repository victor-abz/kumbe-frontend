import { Page, Product, SearchBar } from 'components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { AddProductDialog } from './AddProductDialog';
import { deleteProduct, getProducts } from 'redux/actions/product';
import { AlertConfirm } from 'components/AlertConfirm';

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
  const [confirmDel, setConfirmDel] = useState(false);
  const [currentProd, setCurrentProd] = useState(null);
  const {
    productsGet: { loading, products },
    productRm: { loading: deleting, loaded },
    auth: { user }
  } = useSelector(({ productsGet, productRm, auth }) => ({
    productsGet,
    productRm,
    auth
  }));
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (loaded) {
      setConfirmDel(false);
      setCurrentProd(null);
      getProducts();
    }
  }, [loaded]);
  const handleFilter = () => {};
  const handleSearch = () => {};
  const onProductClick = (prod, action) => {
    setCurrentProd(prod);
    if (action === 'rm') {
      setConfirmDel(true);
    }
    if (action === 'edit') {
      setOpenAddProduct(true);
    }
  };
  return (
    <Page className={classes.root} title={t('settings:page_header')}>
      <AddProductDialog
        currentProduct={currentProd}
        open={openAddProduct}
        setOpen={() => {
          setCurrentProd(null);
          setOpenAddProduct(false);
        }}
      />
      <AlertConfirm
        loading={deleting}
        message={t('product:alert_del')}
        onConfirmYes={() => deleteProduct(currentProd.id)}
        open={confirmDel}
        setOpen={() => setConfirmDel(false)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {t('settings:page_header')}
          </Typography>
        </Grid>
        <Grid item>
          {Number(user.accessLevel) < 3 ? (
            <Button
              color="primary"
              onClick={() => setOpenAddProduct(true)}
              variant="contained">
              {t('settings:add_btn')}
            </Button>
          ) : null}
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
                <Product
                  forAdmin={Number(user.accessLevel) < 3}
                  key={productIdx}
                  onDelete={() => onProductClick(product, 'rm')}
                  onEdit={() => onProductClick(product, 'edit')}
                  {...product}
                />
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
