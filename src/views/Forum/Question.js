import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, PostCard } from 'components';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { getQuestion } from 'redux/actions/forum';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  posts: {
    marginTop: theme.spacing(3)
  },
  post: {
    marginBottom: theme.spacing(3)
  }
}));

const Question = () => {
  const classes = useStyles();
  const {
    qtnGet: { loading, question, loaded }
  } = useSelector(({ qtnGet }) => ({ qtnGet }));

  const { match } = useRouter();
  const {
    params: { qId }
  } = match;

  useEffect(() => {
    const questionId = qId || '';
    getQuestion({ questionId: questionId });
  }, [qId]);

  return (
    <Page className={classes.root} title="Social Feed">
      <div className={classes.posts}>
        {loading ? (
          <Loading />
        ) : loaded ? (
          <PostCard className={classes.post} post={question} />
        ) : (
          <NoDisplayData />
        )}
      </div>
    </Page>
  );
};

export default Question;
