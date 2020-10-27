import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  // Animation
  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(calc(-250px * 7))' }
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
    width: 'calc(250px * 14)'
  },

  slide: {
    height: '100px',
    width: '250px'
  }
}));

const PartnerCarousel = ({ logos }) => {
  const classes = useStyles();

  return (
    <div className={classes.slider}>
      <div className={classes.slideTrack}>
        {logos.map(({ imgUrl }, index) => (
          <div className={classes.slide} key={index}>
            <img alt="" height="100" src={imgUrl} width="250" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default PartnerCarousel;
