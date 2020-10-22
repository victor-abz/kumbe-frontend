import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, Input, Paper, Tooltip } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { addReply } from 'redux/actions/forum';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
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
  }
}));

const CommentForm = props => {
  const { className, postId, loading, user, ...rest } = props;

  const classes = useStyles();

  const fileInputRef = useRef(null);

  const [value, setValue] = useState({
    content: '',
    anonymous: true,
    type: 'question'
  });

  const handleChange = event => {
    event.persist();

    setValue({ ...value, content: event.target.value });
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="User"
        src={`${process.env.REACT_APP_API_URL}/api/res/profiles/${user.profilePic}`}
      />{' '}
      <Paper className={classes.paper} elevation={1}>
        <Input
          className={classes.input}
          disableUnderline
          onChange={handleChange}
          placeholder="Leave a message"
        />
      </Paper>
      <Tooltip title="Send">
        <IconButton
          color={value.content.length > 0 ? 'primary' : 'default'}
          disabled={!value.content || loading}
          onClick={() => addReply(postId, value)}>
          <SendIcon />
        </IconButton>
      </Tooltip>
      <input className={classes.fileInput} ref={fileInputRef} type="file" />
    </div>
  );
};

CommentForm.propTypes = {
  className: PropTypes.string
};

export default CommentForm;
