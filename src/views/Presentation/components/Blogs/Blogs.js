import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomCard from './CustomCard';
import { useSelector } from 'react-redux';
import { getBlogs } from 'redux/actions/blog';

const useGridStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: '100%',
    [breakpoints.only('xs')]: {
      padding: spacing(1, 2),
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'center',
      padding: spacing(2, 15)
    },
  },
}));

export const HighlightCardDemo = React.memo(function HighlightCard() {
  const gridStyles = useGridStyles();
  const { blogs } = useSelector(({ blogsGet }) => blogsGet);
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);
  return (
    <Grid
      classes={gridStyles}
      container
        
      spacing={2}
    >
      {blogs && (
        blogs.map((blog, index) => {
          return  <Grid item key={index} md={3} sm={12}>
            <CustomCard
              color={blog.color}
              content={blog.content}
              cover={blog.coverImage}
              date={blog.createdAt}
              description={blog.description}
              editor={blog.editor}
              id={blog.id}
              slug={blog.slug}
              title={blog.title}
              userImage={blog.usrImage}
            />
          </Grid>
        }))
      }
       
    </Grid>
  );
});

export default HighlightCardDemo;
