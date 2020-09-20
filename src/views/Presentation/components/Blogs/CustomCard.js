import React, { forwardRef } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Button, Card , colors, CardContent, CardMedia, Box, CardActions} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderRounded from '@material-ui/icons/FavoriteBorderRounded';
import Share from '@material-ui/icons/Share';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useNewsInfoStyles } from '@mui-treasury/styles/info/news';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import { useFloatShadowStyles } from '@mui-treasury/styles/shadow/float';
import Color from 'color';
import moment from 'moment';
import { NavLink as RouterLink } from 'react-router-dom';

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const useStyles = makeStyles(() => ({
  color: ({ color }) => ({
    '&:before': {
      backgroundColor: Color(color)
        .darken(0.3)
        .desaturate(0.2)
        .toString(),
    },
  }),
  root: {
    maxWidth: 304,
    margin: 'auto',
  },
  content: ({ color }) => ({
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
    },
  }),
  avatar: {
    width: 50,
    height: 50,
    border: '2px solid #fff',
    borderRadius: '50%',
    '& > img': {
      margin: 0,
    },
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '0.75rem',
  },
}));

export const CustomCard = React.memo(function PostCard({ color, cover, content, userImage, title, description, date, id }) {
  const cardStyles = useStyles({ color });
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFloatShadowStyles();
  const textCardContentStyles = useBlogTextInfoContentStyles();
  const truncate = (str, n) => {
    return (str.length > n) ? str.replace(/<[^>]+>/g, '').substr(0, n-1) + '...' : str;
  };
  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <CardMedia
        classes={mediaStyles}
        image={`${process.env.REACT_APP_API_URL}/blogs/${cover}`}
      />
      <CardContent className={cardStyles.content}>
        <Box position={'relative'} zIndex={1}>
          <Column gap={2} >
            <Row >
              <Avatar className={cardStyles.avatar} src={userImage} variant={'rounded'} />
              <Info useStyles={useNewsInfoStyles}>
                <InfoTitle>{title}</InfoTitle>
                <InfoSubtitle>{ moment(date).fromNow()}</InfoSubtitle>
              </Info>
            </Row>
            <Row>
              <TextInfoContent
                body={truncate(content, 100)}
                classes={textCardContentStyles}
              />
            </Row>
            <Row gap={2} p={0}>
              <Button className={cardStyles.cta} color={'primary'} component={CustomRouterLink} fullWidth to={`/auth/blogs/${id}`} variant={'contained'}>
                  Find Out More <ChevronRightRounded />
              </Button>
            </Row>
          </Column>
        </Box>
      </CardContent>
      <CardActions style={{ height: 50, backgroundColor: '#F1F1F1'}}>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <FavoriteBorderRounded />
        </IconButton>
      </CardActions>
    </Card>
  );
});

export default CustomCard;