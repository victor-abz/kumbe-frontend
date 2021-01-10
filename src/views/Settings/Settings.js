import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, colors } from '@material-ui/core';

import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { Header, General } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const Settings = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page className={classes.root} title={t('settings:profile_settings_title')}>
      <Header />
      <Divider className={classes.divider} />
      <div className={classes.content}>
        <General />
      </div>
    </Page>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Settings;
