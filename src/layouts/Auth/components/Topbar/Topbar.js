/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useStyles } from '../../styles';
import Color from 'color';

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
  Link,
  MenuItem
} from '@material-ui/core';

import InputIcon from '@material-ui/icons/Input';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import LockIcon from '@material-ui/icons/LockOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import TranslateIcon from '@material-ui/icons/Translate';

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import axios from 'utils/axios';
import { useTranslation } from 'react-i18next';
import  useRouter  from 'utils/useRouter';
import { navigationConfig } from '../NavBar/navigationConfig';

const TopBar = props => {
  const { onOpenNavBarMobile, className, t, ...rest } = props;

  const { i18n } = useTranslation();

  const classes = useStyles();

  const defaultLng = 'en';
  let lng = defaultLng;
  
  const storageLanguage = localStorage.getItem('language');
  lng = storageLanguage;

  const [language, setLanguage] = useState(lng);
  const [languages, setLanguages] = useState(['en', 'kin'])
  
  const handleChange = (event) => {
    setLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
    i18n.changeLanguage(event.target.value);
    window.location.reload()
  };

  const { location } = useRouter();
  
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
        <div className = {classes.left}>
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
        </div>
        <Hidden smDown>
          <div style={{ alignItems: 'center'}}>
            <Row gutter={1} className={classes.middle} >
              {
                navigationConfig(t).filter(p => p.title === 'Pages')[0].pages.map((menu, index) => (
                  <RouterLink key={index} to={menu.href} >
                    <Item className= {location.pathname === menu.href ? classes.itemActive : classes.item} >
                      <Typography variant="h6" className={classes.white} >
                        {menu.title}
                      </Typography>
                    </Item>
                  </RouterLink>
                ))
              }
            </Row>
          </div>
        </Hidden>
        <div className={classes.flexGrow}/>
        <Hidden smDown>
          {/* <Button
            className={classes.forumButton}
            variant="contained"
          >
            <LockIcon className={classes.forumIcon} />
            {t('top_bar:title')}
          </Button> */}
          <Button
            className={classes.loginButton}
            color="inherit"
            variant="contained"
            component={Link}
            href={'/login'}

          >
            <InputIcon className={classes.loginIcon} />
            {t('top_bar:login')}
          </Button>
        </Hidden>
        <FormControl>
          <Select
            classes={{ root: classes.select }}
            disableUnderline
            IconComponent={iconComponent}
            MenuProps={menuProps}
            onChange={handleChange}
            value={language}
          >
            {languages.map((option, index) => (
              <MenuItem key={index} value={option.shortName}>
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
  onOpenNavBarMobile: PropTypes.func,
  t: PropTypes.func
};

export default TopBar;