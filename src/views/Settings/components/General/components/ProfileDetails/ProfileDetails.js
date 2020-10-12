import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { UploadImage } from './UploadImage';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlgin: 'center'
  },
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100
  },
  removeBotton: {
    width: '100%'
  }
}));

const ProfileDetails = props => {
  const { profile, className, ...rest } = props;

  const { t } = useTranslation();

  const classes = useStyles();
  const [openAddImage, setOpenAddImage] = useState(false);

  const handleOpen = () => {
    setOpenAddImage(true);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <Avatar
          className={classes.avatar}
          src={`${process.env.REACT_APP_API_URL}/api/res/profiles/${profile.profilePic}`}
        />
        <Typography className={classes.name} gutterBottom variant="h3">
          {profile.firstName} {profile.lastName}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {profile.phone}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {profile.timezone}
        </Typography>
        <UploadImage
          open={openAddImage}
          profile={profile}
          setOpen={() => setOpenAddImage(false)}
        />
      </CardContent>
      <CardActions>
        <Button
          className={classes.removeBotton}
          color={'primary'}
          fullwidth
          onClick={handleOpen}
          variant="contained">
          {t('settings:change_profile')}
        </Button>
      </CardActions>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default ProfileDetails;
