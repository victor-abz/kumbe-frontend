/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
  ListItemIcon,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import TranslateIcon from '@material-ui/icons/Translate';

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import axios from 'utils/axios';

const useStyles = makeStyles(theme => ({
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
  }
}));

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();
  const [language, setLanguage] = useState('en');
  const [languages, setLanguages] = useState([])

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    let mounted = true;

    const fetchLanguages = () => {
      axios.get('/api/languages').then(response => {
        if (mounted) {
          setLanguages(response.data.languages);
        }
      });
    };

    fetchLanguages();

    return () => {
      mounted = false;
    };
  }, []);


  // eslint-disable-next-line react/no-multi-comp
  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon className={props.className + ' ' + classes.icon}/>
    )};

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
        <div className={classes.flexGrow}/>
        <Hidden smDown>
          <Button
            className={classes.forumButton}
            variant="contained"
          >
            <LockIcon className={classes.forumIcon} />
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
              {languages.map((option) => (
                <MenuItem value={option.shortName}>
                  <ListItemIcon classes={{ root: classes.listIcon }}>
                    <TranslateIcon/>
                  </ListItemIcon>
                  <span style={{marginTop:3}}>
                    {option.name}
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
