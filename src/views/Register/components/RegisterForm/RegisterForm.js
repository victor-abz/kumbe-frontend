import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { loginUser } from 'redux/actions';

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
  const { history } = useRouter();

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
    names: {
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
    password: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      length: {
        maximum: 128
      }
    },
    policy: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      checked: true
    }
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

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
    // loginUser(formState.values);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          error={hasError('username')}
          helperText={
            hasError('username') ? formState.errors.username[0] : null
          }
          label= {t('auth:user_name')}
          name="username"
          onChange={handleChange}
          value={formState.values.username || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('names')}
          fullWidth
          helperText={hasError('names') ? formState.errors.names[0] : null}
          label={t('auth:names')}
          name="names"
          onChange={handleChange}
          value={formState.values.names || ''}
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
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
        <FormControl className={classes.formControl} error={hasError('gender')} variant="outlined">
          <InputLabel id="gender-selector">{t('auth:gender')}</InputLabel>
          <Select     
            fullWidth
            id="gender"
            label={t('auth:gender')}
            labelId="gender-selector"
            name="gender"
            onChange={handleChange}
            value={formState.values.gender || ''}
          >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
          </Select>
        </FormControl>

        <div>
          <div className={classes.policy}>
            <Checkbox
              checked={formState.values.policy || false}
              className={classes.policyCheckbox}
              color="primary"
              name="policy"
              onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {t('auth:read_ag')}{' '}
              <Link
                color="secondary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6"
              >
                {t('auth:terms_name')}
              </Link>
            </Typography>
          </div>
          {hasError('policy') && (
            <FormHelperText error>{formState.errors.policy[0]}</FormHelperText>
          )}
        </div>
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        {t('auth:register')}
      </Button>
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string
};

export default RegisterForm;
