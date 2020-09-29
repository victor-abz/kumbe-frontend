import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './style';
import { Link } from 'react-router-dom';

const VideoGridItem = ({
  id,
  title,
  channel,
  thumbnail,
}) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} component={Link} container to={`/watch/${id}`}>
      <Grid item>
        <div className={classes.thumbnail}>
          <img alt="thumbnail" src={thumbnail} />
        </div>
      </Grid>

      <Grid className={classes.details} container direction="column" item xs>
        <Grid className={classes.meta} item>
          <Typography component="h1" variant="h6">
            {title}
          </Typography>
          <Typography color="inherit" variant="body2">
            {channel}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoGridItem;