import React from 'react';
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
import ShareIcon from '@material-ui/icons/Share';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import { useStyles } from './styles/postCard';

const PostCard = props => {
  const { post, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Grid component={RouterLink} to={`/forum/q/${post.id}`}>
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
                : 'Name Hidden(For Privacy)'}
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button
            className={classes.expand}
            component={RouterLink}
            size="small"
            startIcon={<ForumOutlinedIcon />}
            to={`/forum/q/${post.id}`}
            variant="contained">
            {`Replies(${post.replies.length})`}
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
