import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Avatar, colors } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import { useSelector } from 'react-redux';
import { getQuestions } from 'redux/actions/forum';
import { Label } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
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
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 48,
    width: 48
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

const RoiPerCustomer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const {
    qtnsGet: { totalItems }
  } = useSelector(({ qtnsGet }) => ({ qtnsGet }));

  useEffect(() => {
    getQuestions({ pageNumber: 1, pageSize: 20 });
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline">
          All Questions
        </Typography>
        <div className={classes.details}>
          <Typography color="inherit" variant="h3">
            {totalItems}
          </Typography>
          <Label
            className={classes.label}
            color={colors.purple[50]}
            variant="outlined">
            {'Total'}
          </Label>
        </div>
      </div>
      <Avatar className={classes.avatar} color="inherit">
        <ForumIcon />
      </Avatar>
    </Card>
  );
};

RoiPerCustomer.propTypes = {
  className: PropTypes.string
};

export default RoiPerCustomer;
