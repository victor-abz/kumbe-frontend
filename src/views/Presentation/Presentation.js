import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Page } from 'components';
import {
  Banner,
  FAQ,
  PluginsSupport,
  SourceFiles,
  Blogs,
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
      <Banner />
      <Blogs /> 
      {/* <PluginsSupport />
      <SourceFiles />
      <FAQ /> */}
    </Page>
  );
};

export default Presentation;
