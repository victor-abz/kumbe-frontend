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

  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    phone: profile.phone,
    username: profile.username
  });

  const handleChange = event => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    });
  };


  const {  
    updateProfile: { loaded: created, message }, auth: { user } } = useSelector(({ updateProfile, auth }) => ({ updateProfile, auth }));


  useEffect(() => {
    if (created) {
      notifier.success(message);
      getUserProfile()
    }
  }, [created]);

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(values)
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader title="Profile" />
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
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="This will be your login username"
                label="User Name"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="text"
                value={values.phone}
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
                checked={values.isPublic}
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
            type="submit"
            variant="contained"
          >
            Save Changes
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
