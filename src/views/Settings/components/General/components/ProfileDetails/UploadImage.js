import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { updateProfile } from 'redux/actions/profile';
import { useSelector } from 'react-redux';
import { FilesDropzone } from 'components';
import { UPLOADED_FILE_NAME } from 'utils/constants';
import { resetUploadedFile } from 'redux/actions/file';
import { notifier } from 'utils/notifier';
import { getUserProfile } from 'redux/actions';

export const UploadImage = ({ open, setOpen, profile }) => {
  const initialState = { profilePic: '' };
  const [values, setValues] = useState(initialState);
  const { fileUpload: { fileName, loading }, 
    updateProfile: { loaded: created, message } } = useSelector(({ fileUpload, updateProfile }) => ({ fileUpload, updateProfile }));

  useEffect(() => {
    if (fileName) {
      setValues({ profilePic: fileName });
    }
    // eslint-disable-next-line
  }, [fileName]);

  useEffect(() => {
    if (created) {
      localStorage.removeItem(UPLOADED_FILE_NAME);
      resetUploadedFile();
      notifier.success(message);
      setOpen(false)
      getUserProfile()
    }
  }, [created]);
  
  return (
    <Dialog aria-labelledby="cat-dialog-title" onClose={setOpen} open={open}>
      <DialogTitle id="cat-dialog-title">Change your profile Picture</DialogTitle>
      <DialogContent>
        <FilesDropzone currentFile={profile.profilePic} fileType="profile"/>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={setOpen}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={loading || values.profilePic === ''}
          onClick={() => updateProfile(values)}>
          {loading ? 'Saving,...' : 'Save Profile picture'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
UploadImage.propTypes = {
  categoryType: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func
};
