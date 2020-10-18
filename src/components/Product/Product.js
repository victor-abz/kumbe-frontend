import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';

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

export default function Product() {
  const classes = useStyles();

  return (
    <Grid item md={3} xs={12}>
      <Card className={classes.root} elevation={4}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/images/posts/post_1.jpg"
            title="Contemplative Reptile"
          />
          <Box className={classes.wave}>
            <Typography
              component="h2"
              gutterBottom
              style={{ textAlign: 'center', color: '#fff' }}
              variant="h5">
              Lizard
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
