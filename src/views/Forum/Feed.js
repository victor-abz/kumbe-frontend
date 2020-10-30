import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, AddPost, SearchBar, Questions, Paginate } from 'components';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { getQuestions } from 'redux/actions/forum';
import useRouter from 'utils/useRouter';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    // width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  newPost: {
    marginTop: theme.spacing(3)
  },
  posts: {
    marginTop: theme.spacing(3)
  },
  post: {
    marginBottom: theme.spacing(3)
  },
  search: {
    marginTop: theme.spacing(1)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Feed = () => {
  const classes = useStyles();
  const [paginator, setPaginator] = useState({ pageSize: 20, pageNumber: 1 });
  const {
    qtnsGet: { loading, questions, totalItems },
    qtnAdd: { loading: sending, loaded },
    auth: { user }
  } = useSelector(({ qtnsGet, qtnAdd, auth }) => ({ qtnsGet, qtnAdd, auth }));

  const { match } = useRouter();
  const { t } = useTranslation();
  const {
    params: { id }
  } = match;

  useEffect(() => {
    const categoryId = id || '';
    const { pageNumber, pageSize } = paginator;
    getQuestions({ category: categoryId, pageNumber, pageSize });
  }, [id, paginator]);

  useEffect(() => {
    if (loaded) {
      getQuestions({ pageNumber: 1, pageSize: 20 });
    }
  }, [loaded]);
  const handleFilter = () => {};
  const handleSearch = () => {};
  const onPageChage = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <Page className={classes.root} title="Social Feed">
      <SearchBar
        className={classes.search}
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      <AddPost
        className={classes.newPost}
        done={loaded}
        loading={sending}
        user={user}
      />
      <div className={classes.posts}>
        {loading ? (
          <Loading />
        ) : questions.length ? (
          questions.map((post, postIdx) => (
            <Questions className={classes.post} key={postIdx} post={post} />
          ))
        ) : (
          <NoDisplayData message={t('forum:no_questions')} />
        )}
      </div>
      <div className={classes.paginate}>
        <Paginate
          pageCount={Math.ceil(totalItems / paginator.pageSize)}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={onPageChage}
        />
      </div>
    </Page>
  );
};

export default Feed;
