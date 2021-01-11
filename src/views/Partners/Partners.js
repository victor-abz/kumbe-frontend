import { Page, Partner, SearchBar } from 'components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { AddPartnerDialog } from './AddPartnerDialog';
import { getPartners } from 'redux/actions/partner';

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

const PartnerSercices = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openAddPartner, setOpenAddPartner] = useState(false);
  const {
    partnersGet: { loading, partners },
    auth: { user }
  } = useSelector(({ partnersGet, auth }) => ({
    partnersGet,
    auth
  }));
  useEffect(() => {
    getPartners();
  }, []);
  const handleFilter = () => {};
  const handleSearch = () => {};
  return (
    <Page className={classes.root} title={t('settings:partners')}>
      <AddPartnerDialog
        open={openAddPartner}
        setOpen={() => setOpenAddPartner(false)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {t('settings:partners')}
          </Typography>
        </Grid>
        <Grid item>
          {Number(user.accessLevel) < 3 ? (
            <Button
              color="primary"
              onClick={() => setOpenAddPartner(true)}
              variant="contained">
              {t('settings:add_partner')}
            </Button>
          ) : null}
        </Grid>
      </Grid>
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <div className={classes.inner}>
        <Grid alignItems="center" container justify="space-between" spacing={1}>
          <Grid
            alignItems="center"
            container
            direction="row"
            item
            justify="center"
            sm={12}
            spacing={2}>
            {loading ? (
              <Loading />
            ) : partners.length ? (
              partners.map((product, productIdx) => (
                <Partner key={productIdx} {...product} />
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
export default PartnerSercices;
