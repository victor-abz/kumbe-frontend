import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Link, Typography, IconButton } from '@material-ui/core';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { reactReply } from 'redux/actions/forum';
import { httpSocket } from 'utils/http';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  bubble: {
    flexGrow: 1,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  time: {
    marginLeft: 'auto'
  },
  message: {
    marginTop: theme.spacing(1)
  },
  reactions: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const CommentBubble = props => {
  const { comment, className, user, ...rest } = props;
  const { t } = useTranslation();

  const classes = useStyles();
  const [newReacts, setNewReacts] = useState({ likes: 0, dislikes: 0 });
  const [didReact, setDidReact] = useState({
    didLike: false,
    didDisLike: false
  });
  useEffect(() => {
    httpSocket.on('new-reply-react', newReact => {
      if (newReact.replyId === comment.id) {
        setNewReacts(({ likes, dislikes }) => ({
          likes: likes + newReact.like,
          dislikes: dislikes + newReact.dislike
        }));
        if (newReact.userId === user.id) {
          setDidReact({
            didLike: newReact.like === 1,
            didDisLike: newReact.dislike === 1
          });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const liked = comment.likes.some(like => like.userId.includes(user.id));
    const disLiked = comment.dislikes.some(like =>
      like.userId.includes(user.id)
    );
    setDidReact({ didLike: liked, didDisLike: disLiked });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.likes, comment.dislikes]);
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        component={RouterLink}
        src={
          comment.anonymous
            ? null
            : `${process.env.REACT_APP_API_URL}/api/res/profiles/${comment.author.profilePic}`
        }
        to="#"
      />
      <div className={classes.bubble}>
        <div className={classes.header}>
          <Link color="textPrimary" component={RouterLink} to="#" variant="h6">
            {comment.anonymous
              ? t('forum:hidden_names')
              : `${comment.author.firstName} ${comment.author.lastName}`}
          </Link>
          <Typography className={classes.time} variant="body2">
            {moment(comment.createdAt).fromNow()}
          </Typography>
        </div>
        <Typography className={classes.message} variant="body1">
          {comment.content}
        </Typography>
        <div className={classes.reactions}>
          <IconButton
            aria-label="add to favorites"
            onClick={() => reactReply(comment.id, 'like')}
            color={didReact.didLike ? 'secondary' : ''}
            size="small">
            <ThumbUpIcon />
            <Typography color="textSecondary" variant="h6">
              {comment.likes.length + newReacts.likes}
            </Typography>
          </IconButton>
          <IconButton
            aria-label="share"
            color={didReact.didDisLike ? 'secondary' : ''}
            onClick={() => reactReply(comment.id, 'dislike')}
            size="small">
            <ThumbDownAltIcon />
            <Typography color="textSecondary" variant="h6">
              {comment.dislikes.length + newReacts.dislikes}
            </Typography>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

CommentBubble.propTypes = {
  className: PropTypes.string,
  comment: PropTypes.object.isRequired
};

export default CommentBubble;
