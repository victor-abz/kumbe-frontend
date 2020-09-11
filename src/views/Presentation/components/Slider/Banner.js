import React from 'react';
import './style/Example.scss';
import PropTypes from 'prop-types';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button
} from '@material-ui/core';

const Banner = (props) => {
  const contentPosition = props.contentPosition ? props.contentPosition : 'left'
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item key="content" xs={12 / totalItems}>
      <CardContent className="Content">
        <Typography className="Title">
          {props.item.Name}
        </Typography>

        <Typography className="Caption">
          {props.item.Caption}
        </Typography>

        <Button className="ViewButton" variant="outlined">
                    View Now
        </Button>
      </CardContent>
    </Grid>
  )


  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item key={item.Name} xs={12 / totalItems}>
        <CardMedia
          className="Media"
          image={item.Image}
          title={item.Name}
        >
          <Typography className="MediaCaption">
            {item.Name}
          </Typography>
        </CardMedia>

      </Grid>
    )

    items.push(media);
  }

  if (contentPosition === 'left') {
    items.unshift(content);
  } else if (contentPosition === 'right') {
    items.push(content);
  }

  return (
    <Card className="Banner" raised>
      <Grid className="BannerGrid" container spacing={0}>
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