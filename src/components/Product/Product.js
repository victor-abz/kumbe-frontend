import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Box,
  CardActions,
  Button
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

const Product = ({ name, coverImage, forAdmin = false, onEdit, onDelete }) => {
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
        {forAdmin ? (
          <CardActions>
            <Button color="primary" onClick={onEdit} size="small">
              Edit
            </Button>
            <Button color="secondary" onClick={onDelete} size="small">
              Delete
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Grid>
  );
};
export default Product;
