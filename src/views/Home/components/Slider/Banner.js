import React from 'react';
import { useStyles } from './styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button
} from '@material-ui/core';
import { imagesPath } from 'utils/constants';

const Banner = ({ contentPosition: ctPostion, item, index: key }) => {
  const classes = useStyles();
  const contentPosition = ctPostion ? ctPostion : 'left';

  let items = [];
  const content = (
    <Grid
      className={classes.content}
      item
      key={key}
      md={6}
      style={{ background: `${item.backgroundColor}` }}
      xs={12}>
      <CardContent className={classes.bannerText}>
        <Typography
          className={classes.title}
          style={{ color: `${item.titleColor}` }}>
          {item.title}
        </Typography>

        <Typography
          className={classes.caption}
          style={{ color: `${item.captionColor}` }}>
          {item.caption}
        </Typography>

        <Button
          className={classes.button}
          color="secondary"
          component={RouterLink}
          size="large"
          to={`/blogs/categories/${item.categoryId}`}
          type="submit"
          variant="contained">
          {item.clickText}
        </Button>
      </CardContent>
    </Grid>
  );

  const media = (
    <Grid item key={key + imagesPath} md={6} xs={12}>
      <CardMedia
        className={classes.media}
        image={imagesPath + '/' + item.imageLink}
      />
    </Grid>
  );

  items.push(media);

  if (contentPosition === 'left') {
    items.unshift(content);
  } else if (contentPosition === 'right') {
    items.push(content);
  }

  return (
    <Card className={classes.Banner} key={key} raised>
      <Grid className={classes.BannerGrid} container spacing={0}>
        {items}
      </Grid>
    </Card>
  );
};

export default Banner;
