import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, SearchBar } from 'components';
import { Header, AdminBlogs } from './components';
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
  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title={t('blog:view_title')}>
      <Header />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <AdminBlogs className={classes.results} />
    </Page>
  );
};

export default BlogManagementList;
