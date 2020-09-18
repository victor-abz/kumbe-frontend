import React from 'react';
import cx from 'clsx';
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { Row, Item } from '@mui-treasury/components/flex';
import CardContent from '@material-ui/core/CardContent';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import Button from '@material-ui/core/Button';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import PropTypes from 'prop-types';

const useStyles = makeStyles(({ palette }) => ({
  color: ({ color }: { color: string }) => ({
    '&:before': {
      backgroundColor: Color(color)
        .darken(0.3)
        .desaturate(0.2)
        .toString(),
    },
  }),
  root: {
    position: 'relative',
    borderRadius: '1rem',
    minWidth: 320,
    maxWidth: 350,
    '&:before': {
      transition: '0.2s',
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      borderRadius: '1rem',
      zIndex: 0,
      bottom: 0,
    },
    '&:hover': {
      '&:before': {
        bottom: -6,
      },
      '& $userImage': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
      },
    },
  },
  cover: {
    borderRadius: '1rem',
  },
  content: ({ color }: { color: string }) => ({
    position: 'relative',
    zIndex: 1,
    borderRadius: '1rem',
    boxShadow: `0 6px 16px 0 ${Color(color).fade(0.5)}`,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 0,
      width: '100%',
      height: '100%',
      clipPath:
        'polygon(0% 100%, 0% 35%, 0.3% 33%, 1% 31%, 1.5% 30%, 2% 29%, 2.5% 28.4%, 3% 27.9%, 3.3% 27.6%, 5% 27%,95% 0%,100% 0%, 100% 100%)',
      borderRadius: '1rem',
      background: `linear-gradient(to top, ${color}, ${Color(color)
        .rotate(24)
        .lighten(0.12)})`,
    },
  }),
  title: {
    fontFamily: 'Fjalla One',
    fontSize: '18px',
    color: '#fff',
    margin: 0,
  },
  userImage: {
    transition: '0.3s',
    width: 100,
    height: 100,
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.24)',
    // borderRadius: '1rem',
  },
  team: {
    fontFamily: 'Sen',
    fontSize: '0.75rem',
    color: palette.text.hint,
  },
  date: {
    fontFamily: 'Sen',
    color: '#fff',
    backgroundColor: palette.text.hint,
    opacity: 0.72,
    fontSize: '0.75rem',
    padding: '0 0.5rem',
    borderRadius: 12,
  },
  cta: {
    marginTop: 12,
    textTransform: 'initial',
  },
  body: {
    color: '#fff',
  },
}));


const CustomCard = ({ color, cover, content, userImage, title, description, date }) => {
  const styles = useStyles({ color });
  const mediaStyles = useCoverCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };
  return (
    <Box className={cx(styles.root, styles.color)} pt={20}>
      <CardMedia classes={mediaStyles} className={styles.cover} image={cover} />
      <Box className={styles.content} p={2}>
        <Box position={'relative'} zIndex={1}>
          <Row gap={2} p={0}>
            <Item>
              <Avatar className={styles.userImage} src={userImage}  />
            </Item>
            <Item position={'bottom'}>
              <h2 className={styles.title}>{title}</h2>
            </Item>
          </Row>
          <Row gap={2} p={0}>
            <CardContent >
              <TextInfoContent
                body={truncate(content, 100)}
                classes={textCardContentStyles}
              />
              <Button className={styles.cta} color={'primary'} fullWidth variant={'contained'}>
          Find Out More <ChevronRightRounded />
              </Button>
            </CardContent>
          </Row>
          <Row alignItems={'center'} gap={2} p={0}>
            <Item>
              <div className={styles.team}>{description}</div>
            </Item>
            <Item position={'right'}>
              <div className={styles.date}>{date}</div>
            </Item>
          </Row>
        </Box>
      </Box>
    </Box>
  );
};

CustomCard.propTypes = {
  color: PropTypes.string, 
  content: PropTypes.string, 
  cover: PropTypes.string, 
  date: PropTypes.string,
  description: PropTypes.string, 
  title: PropTypes.string, 
  userImage: PropTypes.string
};
  

export default CustomCard;