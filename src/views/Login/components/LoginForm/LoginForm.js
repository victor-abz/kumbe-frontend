import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

import useRouter from 'utils/useRouter';
import { notifier } from 'utils/notifier';
import { useSelector } from 'react-redux';
import { loginUser, setUser } from 'redux/actions';
import { AUTH_TOKEN } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const LoginForm = props => {
  const { className, t, ...rest } = props;
  const classes = useStyles();
  const router = useRouter();
  const login = useSelector(({ login }) => login);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const schema = {
    username: {
      presence: { allowEmpty: false, message: t('error:is_required') }
    },
    password: {
      presence: { allowEmpty: false, message: t('error:is_required') }
    }
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
    // eslint-disable-next-line
  }, [formState.values]);
  useEffect(() => {
    if (login.loaded) {
      localStorage.setItem(AUTH_TOKEN, login.user.token);
      notifier.success(login.message);
      setUser(login.user);
      setTimeout(() => {
        router.history.replace('/admin/blogs');
      }, 5000);
    }
    // eslint-disable-next-line
  }, [login.loaded]);
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    loginUser(formState.values);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}>
      <div className={classes.fields}>
        <TextField
          error={hasError('username')}
          fullWidth
          helperText={
            hasError('username') ? formState.errors.username[0] : null
          }
          label={t('auth:title')}
          name="username"
          onChange={handleChange}
          size="small"
          value={formState.values.username || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          label={t('auth:password')}
          name="password"
          onChange={handleChange}
          size="small"
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained">
        {login.loading ? t('auth:loading') : t('auth:login_button')}
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func
};

export default LoginForm;
