import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, AddPost, SearchBar, Questions } from 'components';
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
  }
}));

const Feed = () => {
  const classes = useStyles();
  const {
    qtnsGet: { loading, questions },
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
    getQuestions({ category: categoryId });
  }, [id]);

  useEffect(() => {
    if (loaded) {
      getQuestions({});
    }
  }, [loaded]);
  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title="Social Feed">
      {/* <Header /> */}
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
    </Page>
  );
};

export default Feed;
