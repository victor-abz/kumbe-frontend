import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Page } from 'components';
import {
  Banner,
  Products,
  Blogs,
  Slider,
  HomeWidgets,
  HomeImages
} from './components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getComics, getDidYouKnow } from 'redux/actions/media';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Home = React.memo(function MemoizeHome() {
  const classes = useStyles();
  const { t } = useTranslation();

  const { comics, loading } = useSelector(({ comicGet }) => comicGet);
  const { didYouKnow, loading: loadingDidYouKnow } = useSelector(
    ({ didYouknowGet }) => didYouknowGet
  );
  useEffect(() => {
    // Get did you know images and comics apart
    getComics('image', { pageSize: 4, byLanguage: 'yes', imageType: 'Comic' });
    getDidYouKnow('image', {
      pageSize: 4,
      byLanguage: 'yes',
      imageType: 'Fact Factory'
    });
  }, []);

  return (
    <Page className={classes.root} title="Home | Kumbe">
      <Slider />
      <Banner />
      <Blogs />
      <HomeImages
        background="#fff"
        loading={loading}
        medias={comics}
        title={t('home:comic_section')}
      />
      <HomeImages
        background="none"
        loading={loadingDidYouKnow}
        medias={didYouKnow}
        title={t('home:did_you_know_section')}
      />
      <HomeWidgets />
      <Products />
      <Banner />
    </Page>
  );
});

export default Home;
