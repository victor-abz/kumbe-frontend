import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Avatar, colors } from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import { Label } from 'components';
import gradients from 'utils/gradients';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundImage: gradients.blue,
    height: 48,
    width: 48
  }
}));

const NewProjects = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const {
    blogsGet: { totalItems }
  } = useSelector(({ blogsGet }) => ({ blogsGet }));

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div>
        <Typography component="h3" gutterBottom variant="overline">
          Total Blogs
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">{totalItems}</Typography>
          <Label
            className={classes.label}
            color={colors.green[600]}
            variant="outlined">
            {'published'}
          </Label>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <LibraryBooksIcon />
      </Avatar>
    </Card>
  );
};

NewProjects.propTypes = {
  className: PropTypes.string
};

export default NewProjects;
