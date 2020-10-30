import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardMedia,
  Avatar,
  Chip,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Input,
  Paper,
  Tooltip,
  Button
} from '@material-ui/core';
import cx from 'clsx';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import HtmlParser from 'react-html-parser';
import { Info, InfoCaption } from '@mui-treasury/components/info';
import { useNewsInfoStyles } from '@mui-treasury/styles/info/news';
import IconButton from '@material-ui/core/IconButton';
import { FavoriteBorderRounded, CommentRounded } from '@material-ui/icons';
import { Share } from 'components';
import { useSelector } from 'react-redux';
import {
  addComment,
  likeBlog,
  resetAddComment,
  shareBlog
} from 'redux/actions/blog';
// import { useBasicProfileStyles }
import { Send as SendIcon } from '@material-ui/icons';
import { BlogComments } from './BlogComments';
import { useTranslation } from 'react-i18next';
import { notifier } from 'utils/notifier';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  },
  media: {
    height: 140
  },
  avatar: {
    width: 50,
    height: 50,
    border: '2px solid #fff',
    borderRadius: '50%',
    '& > img': {
      margin: 0
    }
  },
  chip: {
    maxWidth: '100%',
    margin: theme.spacing(0.2)
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  button: {
    margin: theme.spacing(1, 0)
  }
}));

const MediaCard = props => {
  const { className, blog, ...rest } = props;
  const cardStyles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  const { t } = useTranslation();
  const [likes, setLikes] = useState(blog.likes.length);
  const [shares, setShares] = useState(blog.shares.length);
  const [commentValue, setCommentValue] = useState('');
  const {
    blogLike: { loaded, count },
    blogShare: { loaded: shared },
    commentAdd: { loading, loaded: done }
  } = useSelector(({ blogLike, blogShare, commentAdd }) => ({
    blogLike,
    blogShare,
    commentAdd
  }));
  useEffect(() => {
    if (loaded) {
      setLikes(likes + count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);
  useEffect(() => {
    if (shared) {
      setShares(shares + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shared]);
  useEffect(() => {
    if (done) {
      setCommentValue('');
      resetAddComment();
      notifier.success(t('comment:comment_success'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);
  const onSendComment = () => {
    if (commentValue.length > 20) {
      addComment(blog.slug, { content: commentValue });
    }
  };
  return (
    <Card
      {...rest}
      className={cx(cardStyles.root, className, shadowStyles.root)}>
      <CardActionArea>
        <CardMedia
          classes={mediaStyles}
          image={`${process.env.REACT_APP_API_URL}/api/res/blogs/${blog.coverImage}`}
        />
      </CardActionArea>
      <CardContent>
        <Column gap={2}>
          <Row>
            <Typography component="h2" variant="h4">
              {blog.title}
            </Typography>
          </Row>
          <Row>
            <Item position={'middle'}>
              {blog.tags.map((t, index) => {
                return (
                  <Chip
                    className={cardStyles.chip}
                    clickable
                    color="primary"
                    key={index}
                    label={t.name}
                    size="small"
                    style={{ backgroundColor: t.color }}
                  />
                );
              })}
            </Item>
          </Row>
          <Row gap={1.5}>
            <Item position={'middle'}>
              <Avatar
                className={cardStyles.avatar}
                src={
                  'https://vignette.wikia.nocookie.net/youtube/images/7/77/LeagueOfLegends.jpg/revision/latest?cb=20180718040905'
                }
              />
            </Item>
            <Item position={'middle'}>
              <Info useStyles={useNewsInfoStyles}>
                <InfoCaption>{`By ${blog.author.firstName} ${blog.author.lastName}`}</InfoCaption>
                {/* <InfoSubtitle>{moment(blog.createdAt).fromNow()}</InfoSubtitle> */}
              </Info>
            </Item>
          </Row>
          <Row>
            <Item position={'middle'}>{HtmlParser(blog.content)}</Item>
          </Row>
        </Column>
      </CardContent>
      <CardActions style={{ backgroundColor: '#F1F1F1' }}>
        <Share
          shareCount={shares}
          href={`blogs/${blog.slug}`}
          onShare={() => shareBlog(blog.slug)}
        />
        <IconButton onClick={() => likeBlog(blog.slug)}>
          <FavoriteBorderRounded />
          <Typography variant="body2">{likes}</Typography>
        </IconButton>
        <IconButton>
          <CommentRounded />
          <Typography variant="body2">{blog.comments.length}</Typography>
        </IconButton>
      </CardActions>
      <Card>
        <CardHeader title={t('comment:page_header')} />
        <CardContent>
          <Paper className={cardStyles.paper} elevation={1}>
            <Input
              className={cardStyles.input}
              disableUnderline
              multiline
              onChange={({ target }) => setCommentValue(target.value)}
              placeholder={t('comment:placeholder')}
              rows={3}
            />
          </Paper>
          <Tooltip title={t('comment:btn_send')}>
            <Button
              className={cardStyles.button}
              color="secondary"
              disabled={loading}
              onClick={() => onSendComment()}
              endIcon={<SendIcon>{t('comment:btn_send')}</SendIcon>}
              variant="contained">
              {t('comment:btn_send')}
            </Button>
          </Tooltip>
          <BlogComments blogSlug={blog.slug} />
        </CardContent>
      </Card>
    </Card>
  );
};
export default MediaCard;
