/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TranslateIcon from '@material-ui/icons/Translate';

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import AccountCircle from '@material-ui/icons/AccountCircle';

import axios from 'utils/axios';
import useRouter from 'utils/useRouter';
import { PricingModal, LanguagesPopover } from 'components';
import { logout } from 'actions';
import SortIcon from '@material-ui/icons/Sort';
import { blue } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  // search: {
  //   backgroundColor: 'rgba(255,255,255, 0.1)',
  //   borderRadius: 4,
  //   flexBasis: 300,
  //   height: 36,
  //   padding: theme.spacing(0, 2),
  //   display: 'flex',
  //   alignItems: 'center'
  // },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(8),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
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
  forumButton: {
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

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const languagesRef = useRef(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [language, setLanguage] = useState('en');
  const [openNotifications, setOpenNotifications] = useState(false);

  let Languages

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      axios.get('/api/languages').then(response => {
        if (mounted) {
          Languages= response.data.languages;
        }
      });
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    history.push('/auth/login');
    // dispatch(logout());
  };

  const handlePricingOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingClose = () => {
    setPricingModalOpen(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleSearchChange = event => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  // eslint-disable-next-line react/no-multi-comp
  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon className={props.className + ' ' + classes.icon}/>
    )};

  const popularSearches = [
    'Devias React Dashboard',
    'Devias',
    'Admin Pannel',
    'Project',
    'Pages'
  ];
  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    getContentAnchorEl: null
  };
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <RouterLink to="/">
          <Typography 
            className={classes.title}
            variant="h2" 
          >
            Kumbe!
          </Typography>
          {/* <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          /> */}
        </RouterLink>
        <div className={classes.search}>
          <RouterLink to="/">
            <Typography 
              className={classes.title}
              variant="h4"
            >
            Kumbe!
            </Typography>
          </RouterLink>
        </div>
        <div className={classes.flexGrow}/>
        <Hidden smDown>
          <Button
            className={classes.forumButton}
            onClick={handlePricingOpen}
            variant="contained"
          >
            <LockIcon className={classes.trialIcon} />
            Let's Talk
          </Button>
        </Hidden>
        <Hidden mdDown>
          <FormControl>
            <Select
              classes={{ root: classes.select }}
              disableUnderline
              IconComponent={iconComponent}
              MenuProps={menuProps}
              onChange={handleChange}
              value={language}
            >
              {currencies.map((option) => (
                <MenuItem value={option.value}>
                  <ListItemIcon classes={{ root: classes.listIcon }}>
                    <TranslateIcon/>
                  </ListItemIcon>
                  <span style={{marginTop:3}}>
                    {option.label}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
