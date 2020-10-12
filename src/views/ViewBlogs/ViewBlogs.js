import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { BlogCard } from 'components';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { Page, Paginate, SearchBar } from 'components';
import { Header } from './components';
import { useStyles } from './styles';
import { getBlogs } from 'redux/actions/blog';
import { useTranslation } from 'react-i18next';

const ViewBlogs = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);

  const {
    blogsGet: { loading, blogs }
  } = useSelector(({ blogsGet }) => ({ blogsGet }));

  useEffect(() => {
    getBlogs({});
  }, []);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title={t('blog:blog_browse')}>
      <Header />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <div className={classes.results}>
        <Typography color="textSecondary" gutterBottom variant="body2">
          {blogs.length} Records found. Page {page + 1} of{' '}
          {Math.ceil(blogs.length / rowsPerPage)}
        </Typography>
        <Grid container spacing={3}>
          {loading ? (
            <Loading />
          ) : blogs.length > 0 ? (
            blogs.map(item => (
              <Grid item key={item.id} lg={3} md={4} sm={6} xs={12}>
                <BlogCard {...item} />
              </Grid>
            ))
          ) : null}
        </Grid>
      </div>
      <div className={classes.paginate}>
        <Paginate pageCount={1} />
      </div>
    </Page>
  );
};

export default ViewBlogs;
