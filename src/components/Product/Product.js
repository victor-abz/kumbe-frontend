import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Box
} from '@material-ui/core';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 180
  },
  wave: {
    padding: spacing(3),
    marginTop: -60,
    // background: 'black',
    backgroundImage: `linear-gradient(to top,${palette.black} 35%, transparent )`,
    height: 40
  }
}));

const coverImagePath = `${process.env.REACT_APP_API_URL}/api/res/images`;
const Product = ({ name, coverImage }) => {
  const classes = useStyles();

  return (
    <Grid item md={3} xs={12}>
      <Card className={classes.root} elevation={4}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${process.env.REACT_APP_API_URL}/api/res/images/${coverImage}`}
            title={name}
          />
          <Box className={classes.wave}>
            <Typography
              component="h2"
              gutterBottom
              style={{ textAlign: 'center', color: '#fff' }}
              variant="h5">
              {name}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default Product;
