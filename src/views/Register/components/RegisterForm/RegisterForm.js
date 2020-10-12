import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { notifier } from 'utils/notifier';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@material-ui/core';
import { registerUser } from 'redux/actions';

import useRouter from 'utils/useRouter';

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
  policy: {
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const RegisterForm = props => {
  const { className, t, ...rest } = props;

  const classes = useStyles();
  // const { history } = useRouter();
  const register = useSelector(({ register }) => register);
  const router = useRouter();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const schema = {
    username: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      length: {
        maximum: 32
      }
    },
    firstName: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      length: {
        maximum: 64
      }
    },
    lastName: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      length: {
        maximum: 64
      }
    },
    gender: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      length: {
        maximum: 32
      }
    },
    phone: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      length: {
        maximum: 128
      }
    },
    password: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      length: {
        maximum: 128
      }
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
    if (register.loaded) {
      notifier.success(register.message);
      setTimeout(() => {
        router.history.push('/login');
      }, 5000);
    }
    // eslint-disable-next-line
  }, [register.loaded]);

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
    registerUser(formState.values);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item md={12} sm={12}>
          <TextField
            error={hasError('username')}
            fullWidth
            helperText={
              hasError('username') ? t('auth:username_helper') : null
            }
            label={t('auth:user_name')}
            name="username"
            onChange={handleChange}
            size="small"
            value={formState.values.username || ''}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            error={hasError('firstName')}
            fullWidth
            helperText={
              hasError('firstName') ? t('auth:firstName_helper') : null
            }
            label={t('auth:firstName')}
            name="firstName"
            onChange={handleChange}
            size="small"
            value={formState.values.firstName || ''}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            error={hasError('lastName')}
            fullWidth
            helperText={
              hasError('lastName') ? t('auth:lastName_helper') : null
            }
            label={t('auth:lastName')}
            name="lastName"
            onChange={handleChange}
            size="small"
            value={formState.values.lastName || ''}
            variant="outlined"
          />
        </Grid>
        <Grid item md={12} sm={12}>
          <TextField
            error={hasError('phone')}
            fullWidth
            helperText={hasError('phone') ? t('auth:phone_helper') : null}
            label={t('auth:phone')}
            name="phone"
            onChange={handleChange}
            size="small"
            value={formState.values.phone || ''}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? t('auth:password_helper') : null
            }
            label={t('auth:password')}
            name="password"
            onChange={handleChange}
            size="small"
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            error={hasError('confirmPassword')}
            fullWidth
            helperText={
              hasError('confirmPassword')
                ? t('auth:password_confirm_helper')
                : null
            }
            label={t('auth:confirmPassword')}
            name="confirmPassword"
            onChange={handleChange}
            size="small"
            type="password"
            value={formState.values.confirmPassword || ''}
            variant="outlined"
          />
        </Grid>
        <Grid item md={12} sm={12}>
          <FormControl
            className={classes.formControl}
            error={hasError('gender')}
            fullWidth
            size="small"
            variant="outlined">
            <InputLabel id="gender-selector">{t('auth:gender')}</InputLabel>
            <Select
              fullWidth
              id="gender"
              label={t('auth:gender')}
              labelId="gender-selector"
              name="gender"
              onChange={handleChange}
              value={formState.values.gender || ''}>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* </div> */}
      </Grid>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained">
        {t('auth:register')}
      </Button>
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string,
  t: PropTypes.object
};

export default RegisterForm;
