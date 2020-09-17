import React from 'react';
import cx from 'clsx';
import Color from 'color';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomCard from './CustomCard';
import { Blogs } from '..';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    overflow: 'auto',
    [breakpoints.only('xs')]: {
      '& > *:not(:first-child)': {
        paddingLeft: 0,
      },
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  },
}));

const blogs = [
  {
    usrImage: 'https://d3fa68hw0m2vcc.cloudfront.net/bf4/156511609.jpeg',
    cover: 'https://cdn.vox-cdn.com/thumbor/C6_-SDnnoFdS19XRH4XvAYN1BT8=/148x0:1768x1080/1400x1400/filters:focal(148x0:1768x1080):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/49641465/tracer_overwatch.0.0.jpg',
    title: 'Astronomy Binoculars A Great Alternative',
    description: 'Overwatch Official',
    date: '02.04.2020',
    color: '#fc7944'
  },
  {
    usrImage: 'https://vignette.wikia.nocookie.net/youtube/images/7/77/LeagueOfLegends.jpg/revision/latest?cb=20180718040905',
    cover: 'https://www.pcclean.io/wp-content/uploads/2019/04/559308.jpg',
    title: 'New blogs for young people',
    description: 'League of Legends Official',
    date: '02.04.2020',
    color: '#5357ce'
  },
  {
    usrImage: 'https://vignette.wikia.nocookie.net/youtube/images/7/77/LeagueOfLegends.jpg/revision/latest?cb=20180718040905',
    cover: 'https://www.pcclean.io/wp-content/uploads/2019/04/559308.jpg',
    title: 'New blogs for young people',
    description: 'League of Legends Official',
    date: '02.04.2020',
    color: '#7f5500'
  },
]
export const HighlightCardDemo = React.memo(function HighlightCard() {
  const gridStyles = useGridStyles();
  return (
    <>
      <NoSsr>
        <GoogleFontLoader
          fonts={[{ font: 'Fjalla One' }, { font: 'Sen', weights: [500] }]}
        />
      </NoSsr>
      <Grid
        classes={gridStyles}
        container
        spacing={4}
        style={{ padding: 16 }}
        wrap={'nowrap'}
      >
        {
          blogs.map((blog, index) => {
            return  <Grid item key={blog}>
              <CustomCard
                description={blog.description}
                color={blog.color}
                cover={blog.cover}
                date={blog.date}
                userImage={blog.usrImage}
                title={blog.title}
              />
            </Grid>
          })
        }
       
      </Grid>
    </>
  );
});

export default HighlightCardDemo;
