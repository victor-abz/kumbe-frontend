import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Paper,
  Switch,
  Tooltip,
  Typography
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { addReply } from 'redux/actions/forum';
import { useTranslation } from 'react-i18next';

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

const initialValue = {
  content: '',
  anonymous: false,
  type: 'question'
};
const CommentForm = props => {
  const { className, postId, loading, added, user, ...rest } = props;

  const classes = useStyles();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (added) {
      setValue(initialValue);
    }
  }, [added]);
  const handleChange = ({ target: { name, checked, value: iValue } }) => {
    const inputValue = name === 'anonymous' ? checked : iValue;
    setValue({ ...value, [name]: inputValue });
  };
  const { t } = useTranslation();

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
          name="content"
          onChange={handleChange}
          placeholder={t('forum:reply')}
          value={value.content}
        />
      </Paper>
      <Tooltip title={t('forum:send_reply')}>
        <IconButton
          color={value.content.length > 0 ? 'primary' : 'default'}
          disabled={!value.content || loading}
          onClick={() => addReply(postId, value)}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

CommentForm.propTypes = {
  className: PropTypes.string
};

export default CommentForm;
