import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Link,
  Typography,
  Divider,
  IconButton,
  Grid,
  Button,
  CardActions,
  Collapse
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { CommentBubble, CommentForm } from './components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import { NoDisplayData } from 'components/NoDisplayData';
import { useStyles } from './styles/postCard';
import { useSelector } from 'react-redux';
import { getReplies, likeQuestion } from 'redux/actions/forum';
import { httpSocket } from 'utils/http';
import { notifier } from 'utils/notifier';
import { Share } from 'components';
import { useTranslation } from 'react-i18next';

const PostCard = props => {
  const { post, className, ...rest } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(true);
  const [postReplies, setPostReplies] = useState([]);
  const [newReplies, setNewReplies] = useState([]);
  const [newLikes, setNewLikes] = useState(0);
  const [didLike, setDidLike] = useState(false);
  const {
    replyAdd: { loading, loaded: added },
    repliesGet: { loaded, replies },
    auth: { user }
  } = useSelector(({ replyAdd, repliesGet, auth }) => ({
    repliesGet,
    replyAdd,
    auth
  }));

  const expandQuestion = qtnId => {
    if (!expanded) {
      getReplies(qtnId, {});
    }
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (loaded) {
      setPostReplies(replies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    getReplies(post.id, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    httpSocket.on('new-reply', replyContent => {
      if (replyContent.discussionId === post.id) {
        setNewReplies(rplies => [...rplies, replyContent]);
        setPostReplies(currReplies => [replyContent, ...currReplies]);
      }
      notifier.success(`New update from ${replyContent.userNames}`);
    });
    httpSocket.on('new-question-like', newLike => {
      if (newLike.discussionId === post.id) {
        setNewLikes(theLikes => theLikes + newLike.like);
        if (newLike.userId === user.id) {
          setDidLike(newLike.like === 1);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const liked = post.likes.some(like => like.userId.includes(user.id));
    setDidLike(liked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.likes]);
  return (
    <Grid>
      <div className={classes.category}>
        <Button
          className={classes.popCategory}
          size="small"
          style={{ backgroundColor: '#CC6101', color: '#fff' }}
          variant="contained">
          {post.category.name}
        </Button>
      </div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader
          avatar={
            <Avatar
              alt="Person"
              className={classes.avatar}
              component={RouterLink}
              src={
                post.anonymous
                  ? `${process.env.REACT_APP_API_URL}/api/res/profiles/${post.author.profilePic}`
                  : null
              }
            />
          }
          disableTypography
          subheader={
            <div className={classes.subheader}>
              <AccessTimeIcon className={classes.accessTimeIcon} />
              <Typography variant="body2">
                {moment(post.createdAt).fromNow()}
              </Typography>
            </div>
          }
          title={
            <Link
              color="textPrimary"
              component={RouterLink}
              to="#"
              variant="h6">
              {post.anonymous
                ? `${post.author.firstName} ${post.author.lastName}`
                : t('forum:hidden_names')}
            </Link>
          }
        />
        <CardContent className={classes.content}>
          <Typography className={classes.message} variant="body1">
            {post.content}
          </Typography>
        </CardContent>
        <Divider className={classes.divider} />
        <CardActions className={classes.actions} disableSpacing>
          <IconButton
            aria-label="add to favorites"
            color={didLike ? 'secondary' : ''}
            onClick={() => likeQuestion(post.id)}>
            <FavoriteIcon />
            <Typography variant="body2">
              {post.likes.length + newLikes}
            </Typography>
          </IconButton>
          <IconButton aria-label="share">
            <Share href={`forum/q/${post.id}`} onShare={() => {}} />
          </IconButton>
          <Button
            className={classes.expand}
            onClick={() => expandQuestion(post.id)}
            size="small"
            startIcon={<ForumOutlinedIcon />}
            variant="contained">
            {`Replies(${post.replies.length + newReplies.length})`}
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider className={classes.divider} />
          <Grid className={classes.replies}>
            <CommentForm
              added={added}
              loading={loading}
              postId={post.id}
              user={user}
            />
            <Divider className={classes.divider} />
            {postReplies.length ? (
              <div className={classes.comments}>
                {postReplies.map((comment, commentIdx) => (
                  <CommentBubble
                    comment={comment}
                    key={commentIdx}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <NoDisplayData message={t('forum:first_comment')} />
            )}
          </Grid>
        </Collapse>
      </Card>
    </Grid>
  );
};

PostCard.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default PostCard;
