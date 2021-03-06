import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { BlogCard, BlogsLoading } from 'components';
import { useSelector } from 'react-redux';
import { Page, Paginate, SearchBar } from 'components';
import { Header } from './components';
import { useStyles } from './styles';
import { getBlogs } from 'redux/actions/blog';
import { useTranslation } from 'react-i18next';

const ViewBlogs = ({ match }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [searchVal, setSearchVal] = useState('');
  const [paginator, setPaginator] = useState({ pageSize: 20, pageNumber: 1 });

  const {
    params: { id }
  } = match;

  const {
    blogsGet: { loading, blogs, totalItems }
  } = useSelector(({ blogsGet }) => ({ blogsGet }));

  useEffect(() => {
    const categoryId = id || '';
    const { pageNumber, pageSize } = paginator;
    getBlogs({ category: categoryId, pageSize, pageNumber, search: searchVal });
  }, [id, paginator, searchVal]);

  const handleFilter = () => {};
  const onPageChage = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <Page className={classes.root} title={t('blog:blog_browse')}>
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={({ target }) => setSearchVal(target.value)}
        searchVal={searchVal}
      />
      <div className={classes.results}>
        {blogs.length > 0 && (
          <Typography color="textSecondary" gutterBottom variant="body2">
            {totalItems} Records found. Page {paginator.pageNumber} of{' '}
            {Math.ceil(totalItems / paginator.pageSize)}
          </Typography>
        )}
        <Grid container spacing={3}>
          {loading ? (
            <BlogsLoading lg={3} md={3} sm={12} xl={12} />
          ) : blogs.length > 0 && blogs ? (
            blogs.map(blog => (
              <Grid item key={blog.id} lg={3} md={4} sm={6} xs={12}>
                <BlogCard {...blog} />
              </Grid>
            ))
          ) : null}
        </Grid>
      </div>
      <div className={classes.paginate}>
        <Paginate
          marginPagesDisplayed={2}
          onPageChange={onPageChage}
          pageCount={Math.ceil(totalItems / paginator.pageSize)}
          pageRangeDisplayed={1}
        />
      </div>
    </Page>
  );
};

export default ViewBlogs;
