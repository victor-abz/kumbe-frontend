import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    width: '100%',
    backgroundColor: 'lightGrey'
  },
  videoSection: {
    padding: theme.spacing(3)
  },
  periodCalculator: {
    width: '402px',
    padding: theme.spacing(3),
    backgroundColor: '#fff'
  },
  video: {
    position: 'relative',
    paddingBottom: '56.2%', // aspect ratio 16:9
    '& > img': {
      position: 'absolute',
      objectFit: 'cover',
      width: '100%',
      height: '100%'
    }
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0
  }
}));
