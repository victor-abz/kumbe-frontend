import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getPartners } from 'redux/actions/partner';
import PartnerCarousel from './LogoCarousel';
import { useTranslation } from 'react-i18next';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';

const useStyles = makeStyles(({ spacing, breakpoints, palette }) => ({
  root: {
    backgroundImage: palette.background.default
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

const Partners = props => {
  const { className, ...rest } = props;
  const { t } = useTranslation();

  const classes = useStyles();
  const { partners, loading } = useSelector(({ partnersGet }) => partnersGet);
  useEffect(() => {
    getPartners();
  }, []);

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
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h2">
              {t('home:partners_title')}
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
            {loading ? (
              <Loading />
            ) : partners.length ? (
              <PartnerCarousel logos={partners} />
            ) : (
              <NoDisplayData />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Partners.propTypes = {
  className: PropTypes.string
};

export default Partners;
