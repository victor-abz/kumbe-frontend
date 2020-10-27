import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' }
  },

  slider: {
    background: 'white',
    boxShadow: '0 10px 20px -5px rgba(0, 0, 0, .125)',
    height: '100px',
    margin: 'auto',
    overflow: 'hidden',
    position: 'relative',
    width: '960px',

    '&::before, &::after': {
      background: `linear-gradient(to right,  ${palette.white} 0%,rgba(255,255,255,0) 100%)`,
      content: '""',
      height: '100px',
      position: 'absolute',
      width: '200px',
      zIndex: 2
    },

    '&::after': {
      right: 0,
      top: 0,
      transform: 'rotateZ(180deg)'
    },
    '&::before': {
      left: 0,
      top: 0
    }
  },
  slideTrack: {
    animation: '$scroll 40s linear infinite',
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'absolute'
  },

  logoContainer: {
    height: 100,
    width: 250,
    padding: spacing(2)
  },
  media: {
    height: '100%',
    width: 'auto',
    backgroundSize: 'contain',
    objectFit: 'contain'
  }
}));

const PartnerCarousel = ({ logos }) => {
  const classes = useStyles();
  const slides = logos.concat(logos);

  return (
    <div className={classes.slider}>
      <div className={classes.slideTrack}>
        {slides.map(({ name, coverImage }, index) => (
          <Card className={classes.logoContainer} elevation={0} key={index}>
            <CardMedia
              className={classes.media}
              image={`${process.env.REACT_APP_API_URL}/api/res/images/${coverImage}`}
              title={name}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};
export default PartnerCarousel;
