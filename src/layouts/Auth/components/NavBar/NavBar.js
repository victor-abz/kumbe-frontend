import React, { Fragment, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Divider, Paper, Avatar, Typography } from '@material-ui/core';
import { Hidden } from '@material-ui/core';

import useRouter from 'utils/useRouter';
import { Navigation } from 'components';
import { navigationConfig } from './navigationConfig';
import { toUserAccess } from 'utils/constants';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto'
  },
  content: {
    padding: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  navigation: {
    marginTop: theme.spacing(2)
  }
}));

const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const router = useRouter();
  const { user } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
    // eslint-disable-next-line
  }, [router.location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        {/* <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/profile/1/timeline"
        /> */}
        <Typography className={classes.name} variant="h4">
          Kumbe!
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {navigationConfig(t).map(list => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary">
          <div {...rest} className={clsx(classes.root, className)}>
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square>
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
