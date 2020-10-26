import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, Grid } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    // maxWidth: 345,
    height: 100,
    // width: '100%',
    padding: spacing(2)
  },
  media: {
    height: '100%',
    width: 'auto',
    backgroundSize: 'contain',
    objectFit: 'contain'
  }
}));

const Partner = ({ name, coverImage }) => {
  const classes = useStyles();

  return (
    <Grid item md={2} sm={12} xs={12}>
      <Card className={classes.root} elevation={1}>
        <CardMedia
          className={classes.media}
          image={`${process.env.REACT_APP_API_URL}/api/res/images/${coverImage}`}
          title={name}
        />
      </Card>
    </Grid>
  );
};
export default Partner;
