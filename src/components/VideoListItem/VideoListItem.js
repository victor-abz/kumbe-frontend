import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './style';
import { Link } from 'react-router-dom';
import useRouter from 'utils/useRouter';
import { getThumbnail } from 'utils/constants';

const VideoGridItem = ({ id, title, thumbnail, type }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid
      className={classes.root}
      component={Link}
      container
      onClick={() => router.history.replace(`/watch/${id}`)}>
      <Grid item>
        <div className={classes.thumbnail}>
          <img alt="thumbnail" src={`${getThumbnail(thumbnail, type)}`} />
        </div>
      </Grid>

      <Grid className={classes.details} container direction="column" item xs>
        <Grid className={classes.meta} item>
          <Typography component="h1" variant="h6">
            {title}
          </Typography>
          <Typography color="inherit" variant="body2">
            {Math.floor(Math.random() * 15)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoGridItem;
