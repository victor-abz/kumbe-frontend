import React from 'react';
import { Grid } from '@material-ui/core';
import { default as VideoListItem } from '../VideoListItem';

const VideoList = ({ items, withoutDesc }) => {
  return (
    <Grid container spacing={3}>
      {items !== null &&
        items.length > 0 &&
        items.map((item) => (
          <Grid item key={item.id} xs={12}>
            <VideoListItem {...item} withoutDesc={withoutDesc} />
          </Grid>
        ))}
    </Grid>
  );
};

export default VideoList;
