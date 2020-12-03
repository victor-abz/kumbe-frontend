import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const BlogsLoading = ({ ...rest }) => {
  return (
    <Grid container xl={12} sm={12} md={12} lg={12}>
      {[1, 2, 3, 4].map(item => (
        <Grid key={item} item {...rest}>
          <Skeleton animation="wave" height={200} width="90%" />
          <Skeleton animation="wave" height={15} width="90%" />
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
          <Skeleton
            animation="wave"
            height={10}
            style={{ marginBottom: 6 }}
            width="80%"
          />
          <Skeleton animation="wave" height={10} width="80%" />
        </Grid>
      ))}
    </Grid>
  );
};
export default BlogsLoading;
