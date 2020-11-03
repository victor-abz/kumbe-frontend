import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  // root: {
  //   width: '100%',
  //   padding: theme.spacing(3, 10)
  // },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '100%',
    padding: theme.spacing(3, 10),
    backgroundColor: theme.palette.background.paper
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: theme.typography.fontWeightBold
  },
  results: {
    marginTop: theme.spacing(3)
  },
  // gridList: {
  //   width: 500,
  //   height: 450
  // },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));
