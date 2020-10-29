import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}));
const ImageCard = ({ mediaLink, imageType, createdAt, edit = false }) => {
  const classes = useStyles();
  const imagePath = `${process.env.REACT_APP_API_URL}/api/res/images`;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${imagePath}/${mediaLink}`}
        title={imageType}
      />
      <CardContent>
        <Typography variant="subtitle1">{imageType}</Typography>
        <Typography variant="body2" color="textSecondary">
          {moment(createdAt).format('MMMM DD, YYYY')}
        </Typography>
      </CardContent>
      {edit && (
        <CardActions style={{ height: 50, backgroundColor: '#F1F1F1' }}>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};
export default ImageCard;
