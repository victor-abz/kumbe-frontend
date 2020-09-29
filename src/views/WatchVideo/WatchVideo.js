import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
// Dummy data
import { HighLightVideo } from '../../videoData';

import VideoSection from './VideoSection';
import { VideoList } from 'components';
import { useStyles } from './style';

const WatchVideo = ({ match }) => {
  const { params: { videoId } } = match;
  const classes = useStyles()

  const [video, setVideo] = useState(videoId)

  const videos = HighLightVideo;

  useEffect(() => {
    const v =
    HighLightVideo.filter((video) => video.id === videoId)[0]
    setVideo(v)

  }, [videoId]);

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