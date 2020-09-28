import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  thumbnail: {
    position: 'relative',
    width: '246px',
    height: '138px',
    marginRight: theme.spacing(2),

    '& > img': {
      position: 'absolute',
      objectFit: 'cover',
      width: '100%',
      height: ' 100%',
    },
  },
  details: {
    maxWidth: '600px',
  },
  meta: {
    color: 'rgb(96,96,96)',
  },
  description: {
    paddingTop: theme.spacing(2),
  },
}));
