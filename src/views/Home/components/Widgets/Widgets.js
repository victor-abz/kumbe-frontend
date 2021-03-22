import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './style';
import ReactPlayer from 'react-player/lazy';
import { useTranslation } from 'react-i18next';

const HomeWidget = () => {
  const classes = useStyles();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tools.mdapp.co/js/sdk.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.videoSection} item md={6} xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.video}>
              <ReactPlayer
                className={classes.reactPlayer}
                controls
                height="100%"
                pip
                stopOnUnmount={false}
                url="https://www.youtube.com/watch?v=gy8I5oFlGMk"
                width="100%"
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.periodCalculator} item md={6} xs={12}>
        <Grid
          alignItems="center"
          container
          direction="row"
          item
          justify="center"
          xs={12}>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h3">
            {t('home:period_calculator')}
          </Typography>
        </Grid>
        <div app-id="46" id="mdapp-widget" />
      </Grid>
    </Grid>
  );
};

export default HomeWidget;
