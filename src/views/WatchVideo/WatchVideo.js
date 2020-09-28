import React from 'react';
import { Grid } from '@material-ui/core';
// Dummy data
import { HighLightVideo, NewsVideo } from '../../videoData';

import VideoSection from './VideoSection';
import { VideoList } from 'components';
import { useStyles } from './style';

const WatchVideo = ({ match }) => {
  const { params: { videoId } } = match;
  const classes = useStyles()

  // Use the videoId to fetch video info
  const video =
    HighLightVideo.filter((video) => video.id === videoId)[0] ||
    NewsVideo.filter((video) => video.id === videoId)[0];

  // Use the videoId to fetch related videos info
  const videos = HighLightVideo;

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.videoSection} item md xs={12}>
        <VideoSection video={video} />
      </Grid>
      <Grid className={classes.relatedVideo} item md={'auto'} xs={12}>
        <VideoList items={videos} />
      </Grid>
    </Grid>
  );
};

export default WatchVideo;