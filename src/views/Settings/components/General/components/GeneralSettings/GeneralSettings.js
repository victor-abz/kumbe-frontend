import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  colors
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { notifier } from 'utils/notifier';
import { getUserProfile } from 'redux/actions';
import { updateProfile } from 'redux/actions/profile';
import { useTranslation } from 'react-i18next';
import validate from 'validate.js';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const GeneralSettings = props => {
  const { profile, className, ...rest } = props;
  const { t } = useTranslation()

  const classes = useStyles();

  const {  
    updateProfile: { loaded: created, message } } = useSelector(({ updateProfile }) => ({ updateProfile }));
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      username: profile.username
    },
    touched: {},
    errors: {}
  });

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
    if (created) {
      notifier.success(message);
      getUserProfile()
    }
  }, [created]);

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formState.values)
  }

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
    phone: {
      presence: { allowEmpty: false, message: t('error:is_required') },
      length: {
        maximum: 128
      }
    },
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  console.log(formState, Object.keys(formState.touched).length === 0);
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader title= {t('auth:profile')} />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={hasError('firstName')}
                fullWidth
                helperText={
                  hasError('firstName') ? t('auth:firstName_helper') : null}
                label={t('auth:firstName')}
                name="firstName"
                onChange={handleChange}
                required
                value={formState.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={hasError('lastName')}
                fullWidth
                helperText={hasError('lastName') ?  t('auth:lastName_helper') : null}
                label={t('auth:lastName')}
                name="lastName"
                onChange={handleChange}
                required
                value={formState.values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={hasError('email')}
                fullWidth
                helperText={hasError('email') ? t('auth:email_helper') : null}
                label={t('auth:user_name')}
                name="username"
                onChange={handleChange}
                required
                value={formState.values.username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={hasError('phone')}
                fullWidth
                helperText={hasError('phone') ? t('auth:phone_helper'): null}
                label={t('auth:phone')}
                name="phone"
                onChange={handleChange}
                required
                type="text"
                value={formState.values.phone}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <Typography variant="h6">Make Contact Info Public</Typography>
              <Typography variant="body2">
                Means that anyone viewing your profile will be able to see your
                contacts details
              </Typography>
              <Switch
                checked={formState.isPublic}
                color="secondary"
                edge="start"
                name="isPublic"
                onChange={handleChange}
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color={'primary'}
            disabled={!formState.isValid || Object.keys(formState.touched).length === 0}
            type="submit"
            variant="contained"
          >
            {t('auth:save_changes')}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

GeneralSettings.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default GeneralSettings;
