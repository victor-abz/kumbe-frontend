import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography } from '@material-ui/core';
import { useStyles } from './style';
import useRouter from 'utils/useRouter';

const VideoGridItem = ({ id, description, title, thumbnail }) => {
  const classes = useStyles();
  const router = useRouter();

  // const results = mediaLink.match('[\\?&]v=([^&#]*)');
  // const video_id = results === null ? mediaLink : results[1];

  const AvatarImg =
    'https://i2.wp.com/churchillwild.com/wp-content/uploads/2019/03/janet-the-polar-bear-nanuk-polar-bear-lodge-george-turner-photo.jpg?resize=740%2C740&ssl=1';
  return (
    <div
      className={classes.root}
      component={Link}
      container
      onClick={() => router.history.push(`/watch/${id}`)}>
      <div className={classes.thumbnail}>
        <img alt={title} src={thumbnail} />
      </div>

      <div className={classes.details}>
        <Avatar alt="ava" src={AvatarImg} />
        <div className={classes.meta}>
          <Typography className={classes.title} component="h3" variant="body1">
            {title}
          </Typography>
          <Typography color="inherit" variant="body2">
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoGridItem;
