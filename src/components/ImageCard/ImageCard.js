import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardMedia, IconButton } from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon
} from '@material-ui/icons';
import { ViewImage } from 'views/ImagesGallery/ViewImage';

const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: 345
  },
  media: {
    height: '300px',
    paddingTop: '56.25%' // 16:9
  }
}));
const initials = { open: false, img: {} };
const ImageCard = ({ mediaLink, imageType, edit = false }) => {
  const classes = useStyles();
  const [viewImg, setViewImg] = useState(initials);
  const imagePath = `${process.env.REACT_APP_API_URL}/api/res/images`;
  return (
    <>
      <ViewImage
        open={viewImg.open}
        setOpen={() => setViewImg(initials)}
        {...viewImg.img}
      />
      <Card
        className={classes.root}
        onClick={() => setViewImg({ open: true, img: { mediaLink } })}>
        <CardMedia
          className={classes.media}
          image={`${imagePath}/${mediaLink}`}
          title={imageType}
        />
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
    </>
  );
};
export default ImageCard;
