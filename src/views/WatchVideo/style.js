import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '1600px',
    margin: '0 auto',
  },
  videoSection: {
    padding: theme.spacing(3, 3, 0, 3),
  },
  relatedVideo: {
    width: '402px',
    padding: theme.spacing(3, 3, 0, 3),
  },
}));
