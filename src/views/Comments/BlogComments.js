import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, SearchBar } from 'components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomisedTable } from 'components/CustomizedTable';
import { Grid, Typography } from '@material-ui/core';
import { commentsColumns } from './columns';
import { approveComment, getComments } from 'redux/actions/comment';
import { AlertConfirm } from 'components/AlertConfirm';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

const initialPaginate = { pageSize: 10, pageNumber: 1 };
const BlogComments = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [current, setCurrent] = useState({
    open: false,
    message: '',
    comment: {}
  });
  const [paginator, setPaginator] = useState(initialPaginate);
  const [searchVal, setSearchVal] = useState('');
  const {
    commentsGet: { loading: fetching, comments, totalItems },
    commentApprove: { loading, loaded },
    auth: { user: authUser }
  } = useSelector(({ commentsGet, commentApprove, auth }) => ({
    commentsGet,
    commentApprove,
    auth
  }));
  useEffect(() => {
    const { pageNumber, pageSize } = paginator;
    getComments({ pageNumber, pageSize, search: searchVal }, true);
  }, [paginator, searchVal]);
  useEffect(() => {
    if (loaded) {
      setCurrent({ open: false, message: '', comment: {} });
      getComments({}, true);
    }
  }, [loaded]);
  const handleFilter = () => {};
  const onOpenCurrent = comment => {
    setCurrent({
      open: true,
      message: `Are sure you want to ${
        comment.approved ? 'unpublish' : 'publish'
      } comment from ${comment.author.username.toUpperCase()}`,
      comment
    });
  };
  const handleSearch = ({ target: { value } }) => {
    setPaginator(() => initialPaginate);
    setSearchVal(value);
  };
  const onPageChage = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const { id, approved } = current.comment;
  return (
    <Page className={classes.root} title={t('comment:page_header')}>
      <AlertConfirm
        loading={loading}
        message={current.message}
        onConfirmYes={() => approveComment(id, { approved: !approved })}
        open={current.open}
        setOpen={() => setCurrent({ ...current, open: false })}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {t('comment:page_header')}
          </Typography>
        </Grid>
      </Grid>
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
        searchVal={searchVal}
      />
      <Grid container>
        <Grid item md={12} xs={12}>
          <CustomisedTable
            className={classes.results}
            columns={commentsColumns(t, classes, onOpenCurrent, authUser)}
            data={comments}
            dataCount={totalItems}
            handlePageChange={onPageChage}
            loading={fetching}
            page={paginator.pageNumber}
            pageCount={Math.ceil(totalItems / paginator.pageSize)}
            tableTitle={t('comment:view_title')}
          />
        </Grid>
      </Grid>
    </Page>
  );
};
export default BlogComments;
