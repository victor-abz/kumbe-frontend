import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Input,
  Paper,
  Tooltip,
  Button
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  },
  button: {
    margin: theme.spacing(1, 0)
  }
}));

const AddPost = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleChange = event => {
    event.persist();

    setValue(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Paper className={classes.paper} elevation={1}>
          <Input
            className={classes.input}
            disableUnderline
            multiline
            onChange={handleChange}
            placeholder={
              user
                ? `${user.lastName}, Ask us any question regarding SRHR`
                : 'Login to post question,'
            }
            rows={3}
          />
        </Paper>
        <Tooltip title="Post Question">
          <Button
            className={classes.button}
            color="secondary"
            endIcon={<SendIcon>Post Question</SendIcon>}
            variant="contained">
            Post Question
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

AddPost.propTypes = {
  className: PropTypes.string
};

export default AddPost;
