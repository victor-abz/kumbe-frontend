import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import VideoSection from './VideoSection';
import { VideoList } from 'components';
import { useStyles } from './style';
import { getMediaDetail, getMedias } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';

const WatchVideo = ({ match }) => {
  const {
    params: { videoId }
  } = match;
  const classes = useStyles();
  const {
    mediaDetail: { loading, media },
    mediaGet: { loading: mediasLoading, medias }
  } = useSelector(({ mediaDetail, mediaGet }) => ({ mediaDetail, mediaGet }));

  useEffect(() => {
    getMediaDetail(videoId);
  }, [videoId]);
  useEffect(() => {
    getMedias('video');
  }, []);
  return (
    <Grid className={classes.root} container>
      <Grid className={classes.videoSection} item md xs={12}>
        {loading ? <Loading /> : <VideoSection video={media} />}
      </Grid>
      <Grid className={classes.relatedVideo} item md={'auto'} xs={12}>
        {mediasLoading ? <Loading /> : <VideoList items={medias} />}
      </Grid>
    </Grid>
  );
};

export default WatchVideo;
