import React, { useEffect } from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomCard from './CustomCard';
import { useSelector } from 'react-redux';
import { getBlogs } from 'redux/actions/blog';

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

export const HighlightCardDemo = React.memo(function HighlightCard() {
  const gridStyles = useGridStyles();
  const { loading, blogs } = useSelector(({ blogsGet }) => blogsGet);
  useEffect(() => {
    getBlogs();
  }, []);
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
            return  <Grid item key={index}>
              <CustomCard
                color={blog.color}
                content={blog.content}
                cover={blog.coverImage}
                date={blog.createdAt}
                description={blog.description}
                editor={blog.editor}
                id={blog.id}
                title={blog.title}
                userImage={blog.usrImage}
              />
            </Grid>
          })
        }
       
      </Grid>
    </>
  );
});

export default HighlightCardDemo;
