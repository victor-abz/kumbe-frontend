import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import { useSelector } from 'react-redux';
import { getBlogs } from 'redux/actions/blog';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const BlogManagementList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { loading, blogs } = useSelector(({ blogsGet }) => blogsGet);
  useEffect(() => {
    getBlogs();
  }, []);
  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title={t('blog:view_title')}>
      <Header />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <Results blogs={blogs} className={classes.results} loading={loading} />
    </Page>
  );
};

export default BlogManagementList;
