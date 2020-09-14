// import React from 'react';
// import './style/Example.scss';
// import PropTypes from 'prop-types';

// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
//   Button
// } from '@material-ui/core';

// const Banner = (props) => {
//   const contentPosition = props.contentPosition ? props.contentPosition : 'left'
//   const totalItems = props.length ? props.length : 3;
//   const mediaLength = totalItems - 1;

//   let items = [];
//   const content = (
//     <Grid item key="content" xs={12 / totalItems}>
//       <CardContent className="Content">
//         <Typography className="Title">
//           {props.item.Name}
//         </Typography>

//         <Typography className="Caption">
//           {props.item.Caption}
//         </Typography>

//         <Button className="ViewButton" variant="outlined">
//                     View Now
//         </Button>
//       </CardContent>
//     </Grid>
//   )


//   for (let i = 0; i < mediaLength; i++) {
//     const item = props.item.Items[i];

//     const media = (
//       <Grid item key={item.Name} xs={12 / totalItems}>
//         <CardMedia
//           className="Media"
//           image={item.Image}
//           title={item.Name}
//         >
//           <Typography className="MediaCaption">
//             {item.Name}
//           </Typography>
//         </CardMedia>

//       </Grid>
//     )

//     items.push(media);
//   }

//   if (contentPosition === 'left') {
//     items.unshift(content);
//   } else if (contentPosition === 'right') {
//     items.push(content);
//   }

//   return (
//     <Card className="Banner" raised>
//       <Grid className="BannerGrid" container spacing={0}>
//         {items}
//       </Grid>
//     </Card>
//   )
// }

// Banner.propTypes = {
//   contentPosition: PropTypes.string,
//   item: PropTypes.object,
//   length: PropTypes.number
// };
  

// export default Banner;

import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const data = [
  {
    id: 1,
    title: 'Huarache',
    subtitle: 'Gripp',
    image:
      // eslint-disable-next-line max-len
      'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-huarache-gripp.png?alt=media',
  },
  {
    id: 2,
    title: 'Air Max',
    subtitle: '270 P',
    image:
      // eslint-disable-next-line max-len
      'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-max-270.png?alt=media',
  },
  {
    id: 3,
    title: 'Air Max',
    subtitle: 'Deluxe',
    image:
      // eslint-disable-next-line max-len
      'https://firebasestorage.googleapis.com/v0/b/mui-treasury.appspot.com/o/public%2Fshoes%2Fair-max-deluxe.png?alt=media',
  },
];

const useStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
  root: {
    // a must if you want to set arrows, indicator as absolute
    position: 'relative',
    width: '100%',
  },
  slide: {
    perspective: 1000, // create perspective
    overflow: 'hidden',
    backgroundImage: 'url(/images/8HddMKV.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // relative is a must if you want to create overlapping layers in children
    position: 'relative',
    // paddingTop: spacing(8),
    // [breakpoints.up('sm')]: {
    //   paddingTop: spacing(10),
    // },
    [breakpoints.up('md')]: {
      maxHeight: 450,
      height: 450
    },
    maxHeight: 600,
    height: 600
  },
  imageContainer: {
    display: 'block',
    position: 'relative',
    // zIndex: 2,
    paddingBottom: '56.25%',
    height: '100%'
  },
  image: {
    display: 'block',
    position: 'absolute',
    // zIndex: 10,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // marginLeft: '12%',
    // [breakpoints.up('sm')]: {
    //   marginLeft: '4%',
    // },
  },
  arrow: {
    display: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [breakpoints.up('sm')]: {
      display: 'inline-flex',
    },
  },
  arrowLeft: {
    left: 0,
    [breakpoints.up('lg')]: {
      left: -64,
    },
  },
  arrowRight: {
    right: 0,
    [breakpoints.up('lg')]: {
      right: -64,
    },
  },
  text: {
    // shared style for text-top and text-bottom
    fontFamily: 'Poppins, san-serif',
    fontWeight: 900,
    position: 'absolute',
    color: palette.common.white,
    padding: '0 8px',
    transform: 'rotateY(45deg)',
    lineHeight: 1.2,
    [breakpoints.up('sm')]: {
      padding: '0 16px',
    },
    [breakpoints.up('md')]: {
      padding: '0 24px',
    },
  },
  title: {
    top: 20,
    left: '20%',
    height: '40%',
    fontSize: 40,
    zIndex: 1,
    background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, #9c9c9c 100%)',
    [breakpoints.up('sm')]: {
      top: 40,
      fontSize: 72,
    },
    [breakpoints.up('md')]: {
      top: 52,
      fontSize: 72,
    },
  },
  subtitle: {
    top: 60,
    left: '0%',
    height: '52%',
    fontSize: 56,
    zIndex: 2,
    background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, #888888 100%)',
    [breakpoints.up('sm')]: {
      top: 112,
      left: '6%',
      fontSize: 96,
    },
    [breakpoints.up('md')]: {
      top: 128,
      fontSize: 104,
    },
  },
  indicatorContainer: {
    textAlign: 'center',
  },
}));

const Banner = () => {
  const classes = useStyles();
  const createStyle = (slideIndex, fineIndex) => {
    const diff = slideIndex - fineIndex;
    if (Math.abs(diff) > 1) return {};
    return {
      transform: `rotateY(${(-diff + 1) * 45}deg)`,
    };
  };

  return (
    <div className={classes.slide} >
      {/* <Typography
        className={cx(classes.text, classes.title)}
        noWrap
        style={{  ...createStyle(1, 0) }}
      >
        THis is test
      </Typography>
      <Typography
        className={cx(classes.text, classes.subtitle)}
        noWrap
        style={{ ...createStyle(1, 0) }}
      >
        Subititle test
      </Typography> */}
      {/* <div className={classes.imageContainer}>
        <img alt={'slide'} className={classes.image} src="/images/8HddMKV.jpg" />
      </div> */}
    </div>
  );
};


export default Banner;