import React, { useState, useEffect } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { useStyles } from '../../styles';
import { getCategories } from 'redux/actions/category';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
  Typography,
  MenuItem,
  Menu
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import { Row, Item } from '@mui-treasury/components/flex';
import MenuIcon from '@material-ui/icons/Menu';
import useRouter from 'utils/useRouter';
import { navigationConfig } from '../NavBar/navigationConfig';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import { SystemLanguages } from 'components';

const StyledMenu = withStyles({
  paper: {
    borderRadius: 0,
    backgroundColor: colors.purple[600],
    color: '#fff',
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    elevation={0}
    getContentAnchorEl={null}
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
  const classes = useStyles();
  const { loggedIn, user } = useSelector(({ auth }) => auth);

  const {
    categoryGet: { categories }
  } = useSelector(({ categoryGet }) => ({
    categoryGet
  }));

  const { location } = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <Row className={classes.middle} gutter={1}>
              {navigationConfig(t, categories)
                .filter(p => p.title === 'Pages')[0]
                .pages.map((menu, index) =>
                  menu.children ? (
                    <div key={index}>
                      <RouterLink
                        aria-controls={`popup-${menu.href}`}
                        key={index}
                        onClick={e => handleClick(index, e)}
                        onMouseEnter={e => handleClick(index, e)}
                        to="#">
                        <Item
                          className={
                            anchorEl && Boolean(anchorEl[index])
                              ? classes.itemActive
                              : classes.item
                          }>
                          <Typography className={classes.white} variant="h6">
                            {menu.title}
                          </Typography>
                        </Item>
                      </RouterLink>
                      <StyledMenu
                        anchorEl={anchorEl && anchorEl[index]}
                        id={`popup-${menu.href}`}
                        onClose={handleClose}
                        open={anchorEl && Boolean(anchorEl[index])}>
                        <div onClick={handleClose} onMouseLeave={handleClose}>
                          {menu.children.map((child, index) => (
                            <RouterLink key={index} to={child.href}>
                              <StyledMenuItem>{child.title}</StyledMenuItem>
                            </RouterLink>
                          ))}
                        </div>
                      </StyledMenu>
                    </div>
                  ) : (
                    <RouterLink key={index} to={menu.href}>
                      <Item
                        className={
                          location.pathname === menu.href
                            ? classes.itemActive
                            : classes.item
                        }>
                        <Typography className={classes.white} variant="h6">
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
            component={Link}
            to={'/forum'}
            variant="contained">
            <ForumOutlinedIcon className={classes.forumIcon} />
            {t('top_bar:forum')}
          </Button>
          <Button
            className={classes.loginButton}
            color="inherit"
            component={Link}
            to={loggedIn ? '/admin/blogs' : '/login'}
            variant="contained">
            <InputIcon className={classes.loginIcon} />
            {loggedIn ? user.firstName : t('top_bar:login')}
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
