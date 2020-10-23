import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Link, Typography, IconButton } from '@material-ui/core';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

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
  const { comment, className, ...rest } = props;

  const classes = useStyles();

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
              ? 'Name Hidden(For Privacy)'
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
          <IconButton aria-label="add to favorites" size="small">
            <ThumbUpIcon />
          </IconButton>
          <Typography color="textSecondary" variant="h6">
            {0}
          </Typography>
          <IconButton aria-label="share" size="small">
            <ThumbDownAltIcon />
          </IconButton>
          <Typography color="textSecondary" variant="h6">
            {0}
          </Typography>
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
