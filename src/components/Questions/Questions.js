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
  CardActions
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import { useStyles } from './styles/postCard';
import { Share } from 'components';
import { likeQuestion } from 'redux/actions/forum';
import { httpSocket } from 'utils/http';
import { notifier } from 'utils/notifier';
import { useTranslation } from 'react-i18next';

const PostCard = props => {
  const { post, className, ...rest } = props;
  const [newLikes, setNewLikes] = useState(0);
  const [newReplies, setNewReplies] = useState(0);
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    httpSocket.on('new-question-like', newLike => {
      if (newLike.discussionId === post.id) {
        setNewLikes(theLikes => theLikes + newLike.like);
      }
    });
    httpSocket.on('new-reply', replyContent => {
      if (replyContent.discussionId === post.id) {
        setNewReplies(rplies => rplies + 1);
      }
      notifier.success(`New update from ${replyContent.userNames}`);
    });
  }, []);
  return (
    <Grid>
      <div className={classes.category}>
        <Button
          className={classes.popCategory}
          component={RouterLink}
          size="small"
          style={{ backgroundColor: '#CC6101', color: '#fff' }}
          to={`/forum/c/${post.category.id}`}
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
          <Typography
            className={classes.message}
            component={RouterLink}
            to={`/forum/q/${post.id}`}
            variant="body1">
            {post.content}
          </Typography>
        </CardContent>
        <Divider className={classes.divider} />
        <CardActions className={classes.actions} disableSpacing>
          <IconButton
            aria-label="add to favorites"
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
            component={RouterLink}
            size="small"
            startIcon={<ForumOutlinedIcon />}
            to={`/forum/q/${post.id}`}
            variant="contained">
            {`${t('forum:replies')}s(${post.replies.length + newReplies})`}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

PostCard.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default PostCard;
