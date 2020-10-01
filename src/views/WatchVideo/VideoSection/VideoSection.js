import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { useStyles } from './style';
import ReactPlayer from 'react-player/lazy';

const thumbnailsPath = `${process.env.REACT_APP_API_URL}/api/res/thumbnails`;
const VideoSection = ({ video }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.thumbnail}>
          <ReactPlayer
            className={classes.reactPlayer}
            controls
            height="100%"
            light={`${thumbnailsPath}/${video.thumbnail}`}
            pip
            playing
            stopOnUnmount={false}
            url={video.mediaLink}
            width="100%"
          />
        </div>
      </Grid>

      <Grid className={classes.title} item xs={12}>
        <Typography component="h1" variant="h4">
          {video.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography color="inherit" variant="body1">
          {video.description}
        </Typography>
        <br />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default VideoSection;
