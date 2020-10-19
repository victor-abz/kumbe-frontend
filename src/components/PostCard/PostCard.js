import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardMedia,
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
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Reactions, CommentBubble, CommentForm } from './components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import { NoDisplayData } from 'components/NoDisplayData';

const useStyles = makeStyles(theme => ({
  root: {},
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  accessTimeIcon: {
    color: theme.palette.text.secondary,
    fontSize: '14px',
    height: 14,
    width: 14,
    marginRight: 6
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0
  },
  message: {
    marginBottom: theme.spacing(2)
  },
  mediaArea: {
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 400,
    backgroundPosition: 'initial'
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  category: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(-1.5)
  },
  popCategory: {
    // marginBottom: theme.spacing(-2),
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    height: 20
  },
  expand: {
    // transform: 'rotate(0deg)',
    marginLeft: 'auto',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.white
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  actions: {
    padding: theme.spacing(0, 1),
    marginTop: 0
  },
  replies: {
    padding: theme.spacing(2, 2, 3, 6)
  }
}));

const PostCard = props => {
  const { post, className, ...rest } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
              src={post.author.profilePic}
              to="/profile/1/timeline"
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
              to="/profile/1/timeline"
              variant="h6">
              {`${post.author.firstName} ${post.author.lastName}`}
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
            // color="light"
            onClick={handleExpandClick}
            // size="small"
            startIcon={<ForumOutlinedIcon />}
            variant="contained">
            {`Replies(${post.replies.length})`}
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider className={classes.divider} />
          {/* <Reactions className={classes.reactions} post={post} /> */}
          <Grid className={classes.replies}>
            <CommentForm />
            <Divider className={classes.divider} />
            {post.replies.length ? (
              <div className={classes.comments}>
                {post.replies.map((comment, commentIdx) => (
                  <CommentBubble comment={comment} key={commentIdx} />
                ))}
              </div>
            ) : (
              <NoDisplayData message="Be the first to comment on the post" />
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
