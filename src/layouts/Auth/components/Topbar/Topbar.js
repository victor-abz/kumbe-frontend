/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link, Link as RouterLink, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useStyles } from '../../styles';
import Color from 'color';
import { getCategories } from 'redux/actions/category';
import { getProducts } from 'redux/actions/product';

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
  Menu
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import InputIcon from '@material-ui/icons/Input';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import LockIcon from '@material-ui/icons/LockOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import TranslateIcon from '@material-ui/icons/Translate';

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import axios from 'utils/axios';
import { useTranslation } from 'react-i18next';
import useRouter from 'utils/useRouter';
import { navigationConfig } from '../NavBar/navigationConfig';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

const StyledMenu = withStyles({
  paper: {
    borderRadius: 0,
    backgroundColor: colors.purple[600],
    color: '#fff',
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: '#fff'
    }
  }
}))(MenuItem);

const TopBar = props => {
  const { onOpenNavBarMobile, className, t, ...rest } = props;

  const { i18n } = useTranslation();

  const classes = useStyles();

  const defaultLng = 'en';
  let lng = defaultLng;

  const storageLanguage = localStorage.getItem('language');
  lng = storageLanguage;

  const [language, setLanguage] = useState(lng);
  const [languages, setLanguages] = useState(['en', 'kin']);
  const { loggedIn, user } = useSelector(({ auth }) => auth);

  const handleChange = event => {
    setLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
    i18n.changeLanguage(event.target.value);
    window.location.reload();
  };

  // const {
  //   categoryGet: { loaded, categories }
  // } = useSelector(({ categoryGet }) => ({
  //   categoryGet
  // }));

  const { location } = useRouter();

  useEffect(() => {
    let mounted = true;
    // getCategories();

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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // eslint-disable-next-line react/no-multi-comp
  const iconComponent = props => {
    return (
      <ExpandMoreRoundedIcon className={props.className + ' ' + classes.icon} />
    );
  };

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
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <div className={classes.left}>
          <RouterLink to="/">
            <img alt="Logo" src="/images/logos/logo--white.svg" />
          </RouterLink>
        </div>
        <Hidden smDown>
          <div style={{ alignItems: 'center' }}>
            <Row gutter={1} className={classes.middle}>
              {navigationConfig(t)
                .filter(p => p.title === 'Pages')[0]
                .pages.map((menu, index) =>
                  menu.children ? (
                    <>
                      <RouterLink
                        aria-controls="popup-menu"
                        key={index}
                        onClick={handleClick}>
                        <Item
                          className={
                            Boolean(anchorEl)
                              ? classes.itemActive
                              : classes.item
                          }>
                          <Typography variant="h6" className={classes.white}>
                            {menu.title}
                          </Typography>
                        </Item>
                      </RouterLink>
                      <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menu.children.map((child, index) => (
                          <RouterLink key={index} to={child.href}>
                            <StyledMenuItem>{child.title}</StyledMenuItem>
                          </RouterLink>
                        ))}
                      </StyledMenu>
                    </>
                  ) : (
                    <RouterLink key={index} to={menu.href}>
                      <Item
                        className={
                          location.pathname === menu.href
                            ? classes.itemActive
                            : classes.item
                        }>
                        <Typography variant="h6" className={classes.white}>
                          {menu.title}
                        </Typography>
                      </Item>
                    </RouterLink>
                  )
                )}
            </Row>
          </div>
        </Hidden>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <Button
            className={classes.forumButton}
            variant="contained"
            component={Link}
            to={'/forum'}>
            <ForumOutlinedIcon className={classes.forumIcon} />
            {t('top_bar:forum')}
          </Button>
          <Button
            className={classes.loginButton}
            color="inherit"
            variant="contained"
            component={Link}
            to={loggedIn ? '/admin/blogs' : '/login'}>
            <InputIcon className={classes.loginIcon} />
            {loggedIn ? user.firstName : t('top_bar:login')}
          </Button>
        </Hidden>
        <FormControl>
          <Select
            classes={{ root: classes.select }}
            disableUnderline
            IconComponent={iconComponent}
            MenuProps={menuProps}
            onChange={handleChange}
            value={language}>
            {languages.map((option, index) => (
              <MenuItem key={index} value={option.shortName}>
                <ListItemIcon classes={{ root: classes.listIcon }}>
                  <TranslateIcon />
                </ListItemIcon>
                <span style={{ marginTop: 3 }}>{option.name}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onOpenNavBarMobile}>
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
