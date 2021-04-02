import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
import { logoutUser } from 'redux/actions';
import { AUTH_TOKEN } from 'utils/constants';
import { notifier } from 'utils/notifier';
import { SystemLanguages } from 'components';

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;
  const { t } = useTranslation();
  const { loading, loaded, message } = useSelector(({ logOut }) => logOut);
  const classes = useStyles();
  const searchRef = useRef(null);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (loaded) {
      notifier.success(message);
      localStorage.removeItem(AUTH_TOKEN);
      window.location.replace('/');
    }
  }, [loaded, message]);

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
        </Hidden>
        <Hidden mdDown>
          <Button
            className={classes.logoutButton}
            color="inherit"
            disabled={loading}
            onClick={() => logoutUser()}>
            <InputIcon className={classes.logoutIcon} />
            {t('top_bar:signout')}
          </Button>
        </Hidden>
        <SystemLanguages />
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onOpenNavBarMobile}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
