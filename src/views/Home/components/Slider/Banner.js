import React from 'react';
import PropTypes from 'prop-types';
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

const Banner = ({ contentPosition: ctPostion, item }) => {
  const classes = useStyles();
  const contentPosition = ctPostion ? ctPostion : 'left';

  let items = [];
  const content = (
    <Grid
      className={classes.content}
      item
      key="content"
      md={6}
      style={{ background: `${item.backgroundColor}` }}
      xs={12}>
      <CardContent className={classes.bannerText}>
        <Typography
          className={classes.title}
          style={{ color: `${item.titleColor}` }}>
          {item.Name}
        </Typography>

        <Typography
          className={classes.caption}
          style={{ color: `${item.captionColor}` }}>
          {item.Caption}
        </Typography>

        <Button
          className={classes.button}
          color="secondary"
          component={RouterLink}
          size="large"
          to="/blogs"
          type="submit"
          variant="contained">
          {item.btnText}
        </Button>
      </CardContent>
    </Grid>
  );

  const media = (
    <Grid item md={6} xs={12}>
      <CardMedia className={classes.media} image={item.image} />
    </Grid>
  );

  items.push(media);

  if (contentPosition === 'left') {
    items.unshift(content);
  } else if (contentPosition === 'right') {
    items.push(content);
  }

  return (
    <Card className={classes.Banner} raised>
      <Grid className={classes.BannerGrid} container spacing={0}>
        {items}
      </Grid>
    </Card>
  );
};

Banner.propTypes = {
  contentPosition: PropTypes.string,
  item: PropTypes.object,
  length: PropTypes.number
};

export default Banner;
