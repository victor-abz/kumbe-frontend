import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, AddPost, SearchBar, Questions } from 'components';
import { Header } from './components';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { getQuestions } from 'redux/actions/forum';
import useRouter from 'utils/useRouter';
import { httpSocket } from 'utils/http';

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
  const {
    params: { id },
    path
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
      {path === '/forum/q/:qId' && <p>Love you</p>}
      <Header />
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
          <NoDisplayData />
        )}
      </div>
    </Page>
  );
};

export default Feed;
