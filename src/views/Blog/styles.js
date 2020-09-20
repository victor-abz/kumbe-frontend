import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },

  blogView: {
    margin: theme.spacing(3),
  },
  divider: {
    background: 'black', 
    width: '40%', 
    margin: theme.spacing(0, 1)
  },
  relatedTitle: { 
    margin: theme.spacing(1, 1)
  },
  otherBlogs:{ 
    margin: theme.spacing(1, 1)
  },
  otherBlogsContainer:{
    marginTop: theme.spacing(3)
  }
  
}));
