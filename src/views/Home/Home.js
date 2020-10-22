import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Page } from 'components';
import { Banner, Products, Blogs, Slider } from './components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home | Kumbe">
      <Slider />
      <Banner />
      <Blogs />
      <Products />
    </Page>
  );
};

export default Home;
