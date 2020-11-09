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
    backgroundColor: colors.indigo[900]
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
    backgroundImage: gradients.indigo,
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
        <Typography component="h3" gutterBottom variant="overline">
          Active Partners
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <div className={classes.details}>
            <Typography variant="h3">{totalItems}</Typography>
            <Label
              className={classes.label}
              color={colors.indigo[600]}
              variant="outlined">
              {'partners'}
            </Label>
          </div>
        )}
      </div>
      <Avatar className={classes.avatar}>
        <BusinessIcon />
      </Avatar>
    </Card>
  );
};

SystemHealth.propTypes = {
  className: PropTypes.string
};

export default SystemHealth;
