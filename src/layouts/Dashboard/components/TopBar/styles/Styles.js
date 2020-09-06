import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.purple['A400'],
    '&:hover': {
      backgroundColor: colors.purple['A700']
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
    color: '#ffffff',
    fontWeight: 900
  }, // Ends Her

  forumButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.purple['A400'],
    '&:hover': {
      backgroundColor: colors.purple['A700']
    }
  },
  forumIcon: {
    marginRight: theme.spacing(1)
  },

  title: {
    flexGrow: 1,
    color: '#ffffff',
    fontWeight: 900
  },

  select: {
    display: 'flex',
    color: 'white',
    margin: theme.spacing(1),
    minWidth: 120,
    background: colors.purple[600],
    borderStyle:'none',
    borderRadius: 8,
    paddingLeft: 24,
    paddingTop: 14,
    marginRight: 20,
    paddingBottom: 15,
    boxShadow: 'none',
    '&:focus':{
      borderRadius: 8,
      background: colors.purple[600],
    },
    '&[aria-expanded="true"]':{
      background: colors.purple[600]
    },
    '& > div':{
      display:'inline-flex' // this shows the icon in the SelectInput but not the dropdown
    }
  },
  icon:{
    color: 'white',
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  paper: {
    borderRadius: 4,
    marginTop: 8
  },
  list: {
    paddingTop:0,
    paddingBottom:0,
    paddingRight:8,
    paddingLeft:8,
    background:'white',
    '& li':{
      paddingTop:12,
      paddingBottom:12,
      paddingRight:8,
      paddingLeft:8,
    },
    '& li:hover':{
      background: colors.purple[600],
      color: 'white'
    },
    '& li.Mui-selected':{
      color:'black',
      background: 'white'
    },
    '& li.Mui-selected:hover':{
      background: colors.purple[600],
      color: 'white'
    }
  },
  listIcon: {
    minWidth: 32,
    display: 'none', // hide the ListItemIcon in the dropdown
    color: 'white'
  }
}));

export default useStyles;