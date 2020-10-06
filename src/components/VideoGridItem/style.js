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
    paddingBottom: '56.2%', // aspect ratio 16:9
    marginBottom: theme.spacing(2),

    '& > img': {
      position: 'absolute',
      objectFit: 'cover',
      width: '100%',
      height: ' 100%',
    },
  },
  details: {
    display: 'flex',
  },
  meta: {
    marginLeft: theme.spacing(1.5),
    color: 'rgb(96,96,96)',
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    color: 'rgb(3,3,3)',
  },
}));
