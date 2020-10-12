import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(3, 10)
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: theme.typography.fontWeightBold
  },
  results: {
    marginTop: theme.spacing(3)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));
