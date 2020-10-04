import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Typography } from '@material-ui/core';
import { useStyles } from './style';

const VideoGridItem = ({id, thumbnail, description, title, mediaLink, ...rest }) => {
  const history = useHistory();
  const classes = useStyles();
  console.log(rest);

  const handleVideoClick = (e) => {
    e.stopPropagation();
    history.push({
      pathname: `/watch/${id}`,
    });
  };
  
  const results = mediaLink.match('[\\?&]v=([^&#]*)');
  const vid = ( results === null ) ? mediaLink : results[1];

  const AvatarImg =
  'https://i2.wp.com/churchillwild.com/wp-content/uploads/2019/03/janet-the-polar-bear-nanuk-polar-bear-lodge-george-turner-photo.jpg?resize=740%2C740&ssl=1';

  return (
    <div className={classes.root} onClick={handleVideoClick}>
      <div className={classes.thumbnail}>
        <img alt="thumbnail" src={thumbnail? thumbnail : `http://img.youtube.com/vi/${vid}/0.jpg`} />
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
