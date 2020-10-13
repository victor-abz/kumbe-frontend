import React, { useState, forwardRef } from 'react';

//material-UI
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  ListItem,
  Button,
  List,
  colors,
  Grid,
  Divider
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  buttonLeaf: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  icon: {
    color: theme.palette.icon,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const menu = [
  {
    Icon: HomeIcon,
    text: 'Home'
  },
  {
    Icon: ListAltIcon,
    text: 'Lists'
  },
  {
    Icon: BookmarkBorderIcon,
    text: 'Bookmarked'
  },
  {
    Icon: MailOutlineIcon,
    text: 'Messages'
  }
];

const Sidebar = () => {
  const style = {
    paddingLeft: 8
  };
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <List>
        {menu.map(({ Icon, text }) => (
          <>
            <ListItem className={classes.itemLeaf} disableGutters>
              <Button
                activeClassName={classes.active}
                className={classes.buttonLeaf}
                component={Link}
                exact
                style={style}
                to={'#'}>
                <Icon className={classes.icon} />
                {text}
              </Button>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Grid>
  );
};

export default Sidebar;
