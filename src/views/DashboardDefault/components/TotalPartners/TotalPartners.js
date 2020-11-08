import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Avatar, colors } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';

import gradients from 'utils/gradients';
import { useSelector } from 'react-redux';
import { Label } from 'components';
import { Loading } from 'components/Loading';
import { getPartners } from 'redux/actions/partner';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.indigo[900],
    color: theme.palette.white
  },
  content: {
    flexGrow: 1
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  avatar: {
    backgroundColor: colors.lime[900],
    height: 48,
    width: 48
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

const SystemHealth = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const {
    partnersGet: { totalItems, loading }
  } = useSelector(({ partnersGet }) => ({ partnersGet }));

  useEffect(() => {
    getPartners();
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div className={classes.content}>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline">
          Total Partners
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <div className={classes.details}>
            <Typography color="inherit" variant="h3">
              {totalItems}
            </Typography>
            <Label
              className={classes.label}
              color={colors.grey[50]}
              variant="outlined">
              {'Active'}
            </Label>
          </div>
        )}
      </div>
      <Avatar className={classes.avatar} color="inherit">
        <BusinessIcon />
      </Avatar>
    </Card>
  );
};

SystemHealth.propTypes = {
  className: PropTypes.string
};

export default SystemHealth;
