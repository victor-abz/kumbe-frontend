import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  colors,
  CardContent,
  CardMedia,
  Box,
  CardActions,
  Divider,
  Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderRounded from '@material-ui/icons/FavoriteBorderRounded';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { Column, Row } from '@mui-treasury/components/flex';
// import { Info, InfoCaption } from '@mui-treasury/components/info';
// import { useNewsInfoStyles } from '@mui-treasury/styles/info/news';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import { useFloatShadowStyles } from '@mui-treasury/styles/shadow/float';
import Color from 'color';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Share from './Share';
import { shareBlog } from 'redux/actions/blog';

const useStyles = makeStyles(theme => ({
  color: ({ color }) => ({
    '&:before': {
      backgroundColor: Color(color)
        .darken(0.3)
        .desaturate(0.2)
        .toString()
    }
  }),
  root: {
    maxWidth: '100%',
    margin: theme.spacing(1)
    // margin: 'auto',
  },
  // content: ({ color }) => ({
  content: () => ({
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 0,
      width: '100%',
      height: '100%',
      background: '#fff'
      // background: `linear-gradient( ${color}, ${Color(color)
      //   .rotate(24)
      //   .lighten(0.12)})`,
    },
    cta: {
      marginTop: 12,
      textTransform: 'initial',
      color: colors.purple[600]
    }
  }),
  avatar: {
    width: 50,
    height: 50,
    border: '2px solid #fff',
    borderRadius: '50%',
    '& > img': {
      margin: 0
    }
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '0.75rem'
  }
}));

const BlogCard = React.memo(function PostCard({
  color,
  coverImage,
  content,
  shares,
  slug,
  title,
  author
}) {
  const cardStyles = useStyles({ color });
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFloatShadowStyles();
  const textCardContentStyles = useBlogTextInfoContentStyles();
  const { t } = useTranslation(['blog_preview']);

  // const truncate = (str, n) => {
  //   return str.length > n
  //     ? str.replace(/<[^>]+>/g, '').substr(0, n - 1) + '...'
  //     : str;
  // };
  function truncate(str, maxLen) {
    if (str.length <= maxLen) return str.padEnd(maxLen, '\xa0');
    return str.padEnd(maxLen - 3, '.').substring(0, maxLen) + '...';
  }
  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <CardMedia
        classes={mediaStyles}
        component={Link}
        image={`${process.env.REACT_APP_API_URL}/api/res/blogs/${coverImage}`}
        to={`/blogs/${slug}`}
      />
      <CardContent className={cardStyles.content}>
        <Box position={'relative'} zIndex={1}>
          <Column gap={2}>
            <Row component={Link} to={`/blogs/${slug}`}>
              <Typography component="h6" style={{}} variant="h6">
                {truncate(title, 60)}
              </Typography>
              <Divider />
            </Row>
            {/* <Row>
              <Avatar
                className={cardStyles.avatar}
                src={`${process.env.REACT_APP_API_URL}/api/res/profiles/${author.profilePic}`}
                variant={'rounded'}
              />
              <Info useStyles={useNewsInfoStyles}>
                <InfoCaption>{`${author.firstName} ${author.lastName}`}</InfoCaption>
              </Info>
            </Row> */}
            <Link to={`/blogs/${slug}`}>
              <Row>
                <TextInfoContent
                  body={truncate(content.replace(/<[^>]+>|&nbsp;/g, ''), 80)}
                  classes={textCardContentStyles}
                />
              </Row>
            </Link>

            <Row gap={2} p={0}>
              <Link style={{ width: '100%' }} to={`/blogs/${slug}`}>
                <Button
                  className={cardStyles.cta}
                  color={'primary'}
                  fullWidth
                  variant={'contained'}>
                  {t('blog_preview:blogView')} <ChevronRightRounded />
                </Button>
              </Link>
            </Row>
          </Column>
        </Box>
      </CardContent>
      <CardActions style={{ height: 50, backgroundColor: '#F1F1F1' }}>
        <IconButton>
          <Share
            href={`blogs/${slug}`}
            onShare={() => shareBlog(slug)}
            shareCount={shares.length}
          />
        </IconButton>
        <IconButton>
          <FavoriteBorderRounded />
        </IconButton>
      </CardActions>
    </Card>
  );
});

export default BlogCard;
