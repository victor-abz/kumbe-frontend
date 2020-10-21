import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {},
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  accessTimeIcon: {
    color: theme.palette.text.secondary,
    fontSize: '14px',
    height: 14,
    width: 14,
    marginRight: 6
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0
  },
  message: {
    marginBottom: theme.spacing(2)
  },
  mediaArea: {
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 400,
    backgroundPosition: 'initial'
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  category: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(-1.5)
  },
  popCategory: {
    // marginBottom: theme.spacing(-2),
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    height: 20
  },
  expand: {
    // transform: 'rotate(0deg)',
    marginLeft: 'auto',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.white
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  actions: {
    padding: theme.spacing(0, 1),
    marginTop: 0
  },
  replies: {
    padding: theme.spacing(2, 2, 3, 6)
  }
}));
