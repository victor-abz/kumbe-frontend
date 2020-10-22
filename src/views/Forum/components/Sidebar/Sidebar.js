import React, { forwardRef } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import {
  ListItem,
  Button,
  List,
  colors,
  Grid,
  Divider
} from '@material-ui/core';

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));
const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2, 1)
  },
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
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.white,
      '& $icon': {
        color: theme.palette.white
      }
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
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.white
    }
  }
}));

const Sidebar = ({ categories }) => {
  const style = {
    paddingLeft: 8
  };
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <List>
        <ListItem className={classes.itemLeaf} disableGutters>
          <Button
            activeClassName={classes.active}
            className={classes.buttonLeaf}
            // component={Link}
            component={CustomRouterLink}
            exact
            style={style}
            to={'/forum'}>
            <HomeIcon className={classes.icon} />
            All Categories
          </Button>
        </ListItem>
        <Divider />
        {categories.map(({ Icon, name, id }) => (
          <>
            <ListItem className={classes.itemLeaf} disableGutters key={name}>
              <Button
                activeClassName={classes.active}
                className={classes.buttonLeaf}
                component={CustomRouterLink}
                exact
                style={style}
                to={`/forum/c/${id}`}>
                {Icon ? (
                  <Icon className={classes.icon} />
                ) : (
                  <ForumOutlinedIcon className={classes.icon} />
                )}
                {name}
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
