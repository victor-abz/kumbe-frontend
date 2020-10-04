import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { VideoGridItem } from 'components';
import { HighLightVideo } from '../../videoData';
import { getMedias } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3, 10),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const VideoGrid = () => {
  const classes = useStyles();

  const {
    mediaGet: { loading: mediasLoading, medias }
  } = useSelector(({ mediaGet }) => ({ mediaGet }));

  const title = 'Our latest Videos Vibes'
  useEffect(() => {
    getMedias('video');
  }, []);
  return (
    <div className={classes.root}>
      {title && (
        <Typography className={classes.title} component="h2" variant="h3">
          {title}
        </Typography>
      )}

      <Grid container spacing={3}>
        {mediasLoading ? <Loading /> : 
          medias.length > 0 &&
          medias.map((item) => (
            <Grid item key={item.id} lg={3} md={4} sm={6} xs={12}>
              <VideoGridItem {...item} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default VideoGrid;
