import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Avatar, Chip, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import cx from 'clsx';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import HtmlParser from 'react-html-parser'
import { Info, InfoSubtitle, InfoTitle, InfoCaption } from '@mui-treasury/components/info';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useNewsInfoStyles } from '@mui-treasury/styles/info/news';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderRounded from '@material-ui/icons/FavoriteBorderRounded';
import Share from '@material-ui/icons/Share';
import moment from 'moment';
// import { useBasicProfileStyles }

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  avatar: {
    width: 50,
    height: 50,
    border: '2px solid #fff',
    borderRadius: '50%',
    '& > img': {
      margin: 0,
    },
  },
  chip:{
    maxWidth: '100%',
    margin: theme.spacing(0.2)
  }
}))

export default function MediaCard(props) {
  const { className, blog, ...rest } = props;
  const cardStyles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();  

  return (
    <Card {...rest} className={cx(cardStyles.root, className, shadowStyles.root)}>
      <CardActionArea>
        <CardMedia
          classes={mediaStyles}
          image={`${process.env.REACT_APP_API_URL}/blogs/${blog.coverImage}`}
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
              {
                blog.tags.map((t, index) => {
                  return  <Chip
                    className={cardStyles.chip}
                    clickable
                    color="primary"
                    key={index}
                    label={t.name}
                    size="small"
                    style={{ backgroundColor : t.color}}
                  />
                })
              }
            </Item>
          </Row>
          <Row gap={1.5}>
            <Item position={'middle'}>
              <Avatar className={cardStyles.avatar} src={'https://vignette.wikia.nocookie.net/youtube/images/7/77/LeagueOfLegends.jpg/revision/latest?cb=20180718040905'} />
            </Item>
            <Item position={'middle'}>
              <Info useStyles={useNewsInfoStyles}>
                <InfoCaption>{`By ${blog.editor.firstName} ${blog.editor.lastName}`}</InfoCaption>
                <InfoSubtitle>{moment(blog.createdAt).fromNow()}</InfoSubtitle>
              </Info>
            </Item>
          </Row>
          <Row>
            <Item position={'middle'}>
              {HtmlParser(blog.content)}
            </Item>
          </Row>
        </Column>
      </CardContent>
      <CardActions style={{backgroundColor: '#F1F1F1'}}>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <FavoriteBorderRounded />
        </IconButton>
      </CardActions>
    </Card>
  );
}
