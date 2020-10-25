import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetUploadedFile } from 'redux/actions/file';
import { FilesDropzone } from 'components';
import { addPartner, getPartners } from 'redux/actions/partner';

const initialState = { name: '', coverImage: '' };
export const AddPartnerDialog = ({ open, setOpen }) => {
  const [values, setValues] = useState(initialState);
  const { t } = useTranslation();
  const {
    partnerAdd: { loading, loaded },
    fileUpload: { loaded: done, fileName }
  } = useSelector(({ partnerAdd, fileUpload }) => ({
    partnerAdd,
    fileUpload
  }));
  useEffect(() => {
    if (loaded) {
      setValues(initialState);
      getPartners();
      resetUploadedFile();
      setOpen();
    }
    // eslint-disable-next-line
  }, [loaded]);
  useEffect(() => {
    if (done && fileName) {
      setValues({ ...values, coverImage: fileName });
    }
  }, [done, fileName]);
  const onHandleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <Dialog aria-labelledby="cat-dialog-title" onClose={setOpen} open={open}>
      <DialogTitle id="cat-dialog-title">{t('partner:add_btn')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('partner:dialog_description')}</DialogContentText>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <TextField
              autoFocus
              fullWidth
              label={t('partner:input_name')}
              margin="dense"
              name="name"
              onChange={onHandleChange}
              value={values.name}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <FilesDropzone
              acceptedFiles="image/jpeg, image/png"
              fileType="image"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={setOpen}>
          {t('media:btn_cancel')}
        </Button>
        <Button
          color="primary"
          disabled={loading}
          onClick={() => addPartner(values)}>
          {loading ? t('blog:btn_loading') : t('media:btn_save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
