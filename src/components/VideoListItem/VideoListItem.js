import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './style';

import { useHistory } from 'react-router';

const VideoGridItem = ({
  id,
  title,
  channel,
  thumbnail,
}) => {
  const history = useHistory();
  const classes = useStyles()

  const handleVideoClick = (e) => {
    e.stopPropagation();
    history.push({
      pathname: `/watch/${id}`,
    });
  };

  return (
    <Grid className={classes.root} container onClick={handleVideoClick}>
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
            {channel} views 1 month ago
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoGridItem;