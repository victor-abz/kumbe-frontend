/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
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
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import axios from 'utils/axios';
import { PricingModal, NotificationsPopover } from 'components';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
import { logoutUser } from 'redux/actions';
import { AUTH_TOKEN } from 'utils/constants';
import { notifier } from 'utils/notifier';

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;
  const { t } = useTranslation();
  const { loading, loaded, message } = useSelector(({ logOut }) => logOut);
  const classes = useStyles();
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { i18n } = useTranslation();

  const defaultLng = 'en';
  let lng = defaultLng;

  const storageLanguage = localStorage.getItem('language');
  lng = storageLanguage;

  const [language, setLanguage] = useState(lng);
  const [languages, setLanguages] = useState(['en', 'kin']);

  const handleChange = event => {
    setLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
    i18n.changeLanguage(event.target.value);
    window.location.reload();
  };

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      axios.get('/api/account/notifications').then(response => {
        if (mounted) {
          setNotifications(response.data.notifications);
        }
      });
    };

    fetchNotifications();

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
  useEffect(() => {
    if (loaded) {
      notifier.success(message);
      localStorage.removeItem(AUTH_TOKEN);
      window.location.replace('/');
    }
  }, [loaded, message]);

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

  const popularSearches = [
    'Devias React Dashboard',
    'Devias',
    'Admin Pannel',
    'Project',
    'Pages'
  ];

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
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div className={classes.search} ref={searchRef}>
            <SearchIcon className={classes.searchIcon} />
            <Input
              className={classes.searchInput}
              disableUnderline
              onChange={handleSearchChange}
              placeholder={t('top_bar:search')}
              value={searchValue}
            />
          </div>
          <Popper
            anchorEl={searchRef.current}
            className={classes.searchPopper}
            open={openSearchPopover}
            transition>
            <ClickAwayListener onClickAway={handleSearchPopverClose}>
              <Paper className={classes.searchPopperContent} elevation={3}>
                <List>
                  {popularSearches.map(search => (
                    <ListItem
                      button
                      key={search}
                      onClick={handleSearchPopverClose}>
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
          {/* <Button
            className={classes.trialButton}
            onClick={handlePricingOpen}
            variant="contained">
            <LockIcon className={classes.trialIcon} />
            Trial expired
          </Button> */}
        </Hidden>
        <Hidden mdDown>
          <IconButton
            className={classes.notificationsButton}
            color="inherit"
            onClick={handleNotificationsOpen}
            ref={notificationsRef}>
            <Badge
              badgeContent={notifications.length}
              classes={{ badge: classes.notificationsBadge }}
              variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            className={classes.logoutButton}
            color="inherit"
            disabled={loading}
            onClick={() => logoutUser()}>
            <InputIcon className={classes.logoutIcon} />
            {t('top_bar:signout')}
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
      <PricingModal onClose={handlePricingClose} open={pricingModalOpen} />
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
