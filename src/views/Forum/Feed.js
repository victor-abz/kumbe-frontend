import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'utils/axios';
import { Page, PostCard, AddPost, SearchBar } from 'components';
import { Header } from './components';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { getQuestions } from 'redux/actions/forum';

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

const Feed = ({ user }) => {
  const classes = useStyles();
  const {
    qtnsGet: { loading, questions },
    qtnAdd: { loading: sending, loaded }
  } = useSelector(({ qtnsGet, qtnAdd }) => ({ qtnsGet, qtnAdd }));
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getQuestions({});
  }, []);
  useEffect(() => {
    if (loaded) {
      getQuestions({});
    }
  }, [loaded]);
  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title="Social Feed">
      <Header />
      <SearchBar
        className={classes.search}
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      <AddPost
        className={classes.newPost}
        loading={sending}
        done={loaded}
        user={user}
      />
      <div className={classes.posts}>
        {loading ? (
          <Loading />
        ) : questions.length ? (
          questions.map((post, postIdx) => (
            <PostCard className={classes.post} key={postIdx} post={post} />
          ))
        ) : (
          <NoDisplayData />
        )}
      </div>
    </Page>
  );
};

export default Feed;
