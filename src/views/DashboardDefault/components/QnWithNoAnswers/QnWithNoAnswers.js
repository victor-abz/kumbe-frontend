import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Avatar, colors } from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import { useSelector } from 'react-redux';
import { getQuestions } from 'redux/actions/forum';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.red[300]
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
    backgroundColor: theme.palette.white,
    color: colors.red[300],
    height: 48,
    width: 48
  }
}));

const QnWithNoAnswers = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const {
    qtnsGet: { questions }
  } = useSelector(({ qtnsGet }) => ({ qtnsGet }));

  useEffect(() => {
    getQuestions({ pageNumber: 1, pageSize: 20 });
  }, []);

  const no_answer = questions.filter(question => {
    return question.replies.length == 0;
  });

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline">
          Question without answers
        </Typography>
        <div className={classes.details}>
          <Typography color="inherit" variant="h3">
            {no_answer ? no_answer.length : 0}
          </Typography>
        </div>
      </div>
      <Avatar className={classes.avatar} color="inherit">
        <ContactSupportIcon />
      </Avatar>
    </Card>
  );
};

QnWithNoAnswers.propTypes = {
  className: PropTypes.string
};

export default QnWithNoAnswers;
