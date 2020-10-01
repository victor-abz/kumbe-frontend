import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
// Dummy data
import { HighLightVideo } from '../../videoData';

import VideoSection from './VideoSection';
import { VideoList } from 'components';
import { useStyles } from './style';
import { getMediaDetail } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';

const WatchVideo = ({ match }) => {
  const {
    params: { videoId }
  } = match;
  const classes = useStyles();
  const { loading, media } = useSelector(({ mediaDetail }) => mediaDetail);
  const videos = HighLightVideo;

  useEffect(() => {
    getMediaDetail(videoId);
  }, [videoId]);

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.videoSection} item md xs={12}>
        {loading ? <Loading /> : <VideoSection video={media} />}
      </Grid>
      <Grid className={classes.relatedVideo} item md={'auto'} xs={12}>
        <VideoList items={videos} />
      </Grid>
    </Grid>
  );
};

export default WatchVideo;
