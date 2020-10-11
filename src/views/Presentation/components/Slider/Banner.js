import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button
} from '@material-ui/core';

const Banner = (props) => {
  const classes = useStyles();
  const contentPosition = props.contentPosition ? props.contentPosition : 'left'

  let items = [];
  const content = (
    <Grid
      className={classes.content} 
      item 
      key="content" 
      md={6} 
      style={{ background: `${props.item.backgroundColor}` }}  
      xs={12}
    >
      <CardContent className={classes.bannerText} >
        <Typography className={classes.title} style={{ color : `${props.item.titleColor}`}}>
          {props.item.Name}
        </Typography>

        <Typography className={classes.caption} style={{ color : `${props.item.captionColor}`}}>
          {props.item.Caption}
        </Typography>

        <Button
          className={classes.button}
          color="secondary"
          size="large"
          type="submit"
          variant="contained">
          View More
        </Button>
      </CardContent>
    </Grid>
  )

  const media = (
    <Grid item md={6}  xs={12}>
      <CardMedia
        className={classes.media}
        image={props.item.image}
      />

    </Grid>
  )

  items.push(media);

  if (contentPosition === 'left') {
    items.unshift(content);
  } else if (contentPosition === 'right') {
    items.push(content);
  }

  return (
    <Card className={classes.Banner} raised >
      <Grid className={classes.BannerGrid} container spacing={0}>
        {items}
      </Grid>
    </Card>
  )
}

Banner.propTypes = {
  contentPosition: PropTypes.string,
  item: PropTypes.object,
  length: PropTypes.number
};
  

export default Banner;