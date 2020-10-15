import React, { useEffect } from 'react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography
} from '@material-ui/core';
import { AccessTime, Favorite } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { useTranslation } from 'react-i18next';
import { getComments } from 'redux/actions/comment';

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
export const BlogComments = ({ blogSlug = '' }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { loading, comments } = useSelector(({ commentsGet }) => commentsGet);
  useEffect(() => {
    if (blogSlug) {
      getComments({ blogId: blogSlug });
    }
  }, [blogSlug]);
  const profilePicPath = `${process.env.REACT_APP_API_URL}/api/res/profiles`;
  return (
    <Grid>
      {loading ? (
        <Loading />
      ) : comments.length ? (
        comments.map((comment, commentIdx) => (
          <Card key={commentIdx}>
            <CardHeader
              avatar={
                <Avatar
                  alt={comment.user.firstName}
                  className={classes.avatar}
                  component={RouterLink}
                  src={`${profilePicPath}/${comment.user.profilePic}`}
                  to="#"
                />
              }
              disableTypography
              subheader={
                <div className={classes.subheader}>
                  <AccessTime className={classes.accessTimeIcon} />
                  <Typography variant="body2">
                    {moment(comment.createdAt).fromNow()}
                  </Typography>
                </div>
              }
              title={
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/profile/1/timeline"
                  variant="h6">
                  {`${comment.user.firstName} ${comment.user.lastName}`}
                </Link>
              }
            />
            <CardContent className={classes.content}>
              <Typography className={classes.message} variant="body1">
                {comment.content}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableSpacing>
              <IconButton aria-label="add to favorites">
                <Favorite />
              </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <NoDisplayData message={t('comment:no_display_data')} />
      )}
    </Grid>
  );
};
