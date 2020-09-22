import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import Color from 'color';

const itemHorzPadding = 3;
const activeColor = Color('#fff')
  .rotate(-6)
  .lighten(0.4)
  .fade(0.87)
  .toString()

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
  }, 
  white: {
    color: '#fff'
  },
  item: {
    padding: theme.spacing(1, itemHorzPadding),
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#ffffff',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '&:not(:first-child)': {
      marginLeft: theme.spacing(1),
    },
  },
  itemActive: {
    '&$item': {
      backgroundColor: theme.palette.secondary.light,
      color: '#fff',
    },
  },
}));

export default useStyles;