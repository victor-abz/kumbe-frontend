import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  colors,
  Avatar
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  published: {
    '& $indicator': {
      borderColor: colors.green[600]
    }
  },
  indicator: {
    height: 12,
    width: 12,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: colors.grey[100],
    borderRadius: '50%'
  },
  viewButton: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    width: 50,
    height: 50,
    border: '2px solid #fff',
    borderRadius: '50%',
    '& > img': {
      margin: 0
    }
  }
}));

const BlogItem = props => {
  const { blog, className, ...rest } = props;

  const classes = useStyles();

  return (
    <ListItem
      {...rest}
      className={clsx(
        classes.root,
        { [classes.published]: blog.isPublished },
        className
      )}>
      <ListItemIcon>
        <span className={classes.indicator} />
      </ListItemIcon>
      <ListItemText
        className={classes.listItemText}
        primary={blog.title}
        primaryTypographyProps={{ variant: 'h6', noWrap: true }}
        secondary={moment(blog.createdAt).fromNow()}
      />
      <Avatar
        className={classes.avatar}
        src={`${process.env.REACT_APP_API_URL}/api/res/profiles/${blog.author.profilePic}`}
        variant={'rounded'}
      />
      <Tooltip title="View Blog">
        <IconButton
          className={classes.viewButton}
          component={Link}
          edge="end"
          size="small"
          to={`/blogs/${blog.slug}`}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

BlogItem.propTypes = {
  className: PropTypes.string,
  blog: PropTypes.object.isRequired
};

export default BlogItem;
