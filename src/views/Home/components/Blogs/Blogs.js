import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BlogCard } from 'components';
import { useSelector } from 'react-redux';
import { getBlogs } from 'redux/actions/blog';
import { Loading } from 'components/Loading';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Title from 'components/ComponentTitle';
import { useTranslation } from 'react-i18next';

const useGridStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: '100%',
    [breakpoints.only('xs')]: {
      padding: spacing(1, 2)
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'center',
      padding: spacing(3, 15)
    }
  }
}));

export const HomeBlogs = React.memo(function HighlightCard() {
  const gridStyles = useGridStyles();
  const { blogs, loading } = useSelector(({ blogsGet }) => blogsGet);
  useEffect(() => {
    getBlogs({ pageSize: 4 });
  }, []);
  const { t } = useTranslation();

  return (
    <Grid classes={gridStyles} container spacing={2}>
      <Title title={t('home:blog_section')} />
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
        <Button
          color="primary"
          component={Link}
          style={{ marginBottom: 10 }}
          to="/blogs"
          variant={'contained'}>
          {t('home:view_more')}
        </Button>
      ) : null}
    </Grid>
  );
});

export default HomeBlogs;
