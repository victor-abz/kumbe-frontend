import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Page } from 'components';
import {
  Header,
  FAQ,
  PluginsSupport,
  SourceFiles,
  UserFlows,
  Slider
} from './components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Presentation = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Home | Kumbe"
    >
      <Slider />
      <Header />
      <UserFlows /> 
      <PluginsSupport />
      <SourceFiles />
      <FAQ />
    </Page>
  );
};

export default Presentation;
