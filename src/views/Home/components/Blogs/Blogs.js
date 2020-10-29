import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BlogCard } from 'components';
import { useSelector } from 'react-redux';
import { getBlogs } from 'redux/actions/blog';
import { Loading } from 'components/Loading';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useGridStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: '100%',
    [breakpoints.only('xs')]: {
      padding: spacing(1, 2)
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'center',
      padding: spacing(2, 15)
    }
  }
}));

export const HomeBlogs = React.memo(function HighlightCard() {
  const gridStyles = useGridStyles();
  const { blogs, loading } = useSelector(({ blogsGet }) => blogsGet);
  useEffect(() => {
    getBlogs({ pageSize: 4 });
  }, []);
  return (
    <Grid classes={gridStyles} container spacing={2}>
      {loading ? (
        <Loading />
      ) : (
        blogs.map((blog, index) => {
          return (
            <Grid item key={index} md={3} sm={12}>
              <BlogCard {...blog} />
            </Grid>
          );
        })
      )}
      {blogs.length === 4 ? (
        <Button color="primary" component={Link} to="/blogs">
          View more
        </Button>
      ) : null}
    </Grid>
  );
});

export default HomeBlogs;
