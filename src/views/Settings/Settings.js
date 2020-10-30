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

const Settings = props => {
  // const { match } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  // const { tab } = match.params;

  // const handleTabsChange = (event, value) => {
  //   history.push(value);
  // };

  // const tabs = [
  //   { value: 'general', label: 'General' },
  // { value: 'subscription', label: 'Subscription' },
  // { value: 'notifications', label: 'Notifications' },
  // { value: 'security', label: 'Security' }
  // ];

  // if (!tab) {
  //   return <Redirect to="/user/profile/general" />;
  // }

  // if (!tabs.find(t => t.value === tab)) {
  //   return <Redirect to="/errors/error-404" />;
  // }

  return (
    <Page className={classes.root} title={t('settings:profile_settings_title')}>
      <Header />
      <Divider className={classes.divider} />
      <div className={classes.content}>
        <General />
      </div>
      {/* <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === 'general' && <General />}
        {tab === 'subscription' && <Subscription />}
        {tab === 'notifications' && <Notifications />}
        {tab === 'security' && <Security />} 
      </div> */}
    </Page>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Settings;
