import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { useStyles } from './style';

const VideoSection = ({ video }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.thumbnail}>
          <img alt="thumbnail" src={video.thumbnail} />
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
          {video.desc}
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

