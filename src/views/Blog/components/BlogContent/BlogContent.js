import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Avatar, Chip, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import cx from 'clsx';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useNewsInfoStyles } from '@mui-treasury/styles/info/news';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderRounded from '@material-ui/icons/FavoriteBorderRounded';
import Share from '@material-ui/icons/Share';
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
const tags = [
  {
    tagName: 'Sexual',
    color: 'pink'
  },
  {
    tagName: 'parenting',
    color: 'green'
  },
  {
    tagName: 'Teen Age',
    color: 'red',
  }
]

export default function MediaCard(props) {
  const { className, ...rest } = props;
  const cardStyles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  const textCardContentStyles = useBlogTextInfoContentStyles();

  return (
    <Card {...rest} className={cx(cardStyles.root, className, shadowStyles.root)}>
      <CardActionArea>
        <CardMedia
          // className={cardStyles.media}
          classes={mediaStyles}
          image="https://www.pcclean.io/wp-content/uploads/2019/04/559308.jpg"
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardContent>
        <Column gap={2}>
          <Row>
            <Typography component="h2" variant="h4">
              Sobanukirwa ukwezi k’umugore n’uko bakubara.
            </Typography>
          </Row>
          <Row>
            <Item position={'middle'}>
              {
                tags.map((t, index) => {
                  return  <Chip
                    className={cardStyles.chip}
                    clickable
                    color="primary"
                    key={index}
                    label={t.tagName}
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
                <InfoTitle>{'By Alexandre Murinzi'}</InfoTitle>
                <InfoSubtitle>July 12, 2020</InfoSubtitle>
              </Info>
            </Item>
          </Row>
          <Row>
            <Item position={'middle'}>
              <TextInfoContent
                body={'Lizards are a widespread group of squamate reptiles, with over 6,000 species, rangingacross all continents except Antarctica'}
                classes={textCardContentStyles}
              />
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
