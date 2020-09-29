import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography
} from '@material-ui/core';
import { addMedia, getMedias } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { useStyles } from 'components/FilesDropzone/styles';
import clsx from 'clsx';
import { uploadFile } from 'redux/actions/file';

const types = ['audio', 'video', 'image'];

const initialState = { title: '', description: '', type: '', mediaLink: '' };
export const AddMediaDialog = ({ open, setOpen }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [theFile, setTheFile] = useState(null);
  const { t } = useTranslation();
  const {
    mediaAdd: { loading, loaded },
    fileUpload
  } = useSelector(({ mediaAdd, fileUpload }) => ({ mediaAdd, fileUpload }));

  useEffect(() => {
    if (loaded) {
      setValues(initialState);
      getMedias();
      setOpen();
    }
    // eslint-disable-next-line
  }, [loaded]);
  useEffect(() => {
    if (fileUpload.loaded) {
      setValues({ ...values, mediaLink: fileUpload.fileName });
    }
  }, [fileUpload.loaded]);
  const onHandleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  const onDrop = useCallback(acceptedFiles => {
    setTheFile(acceptedFiles[0]);
  }, []);
  useEffect(() => {
    if (values.type !== '' && theFile) {
      const formData = new FormData();
      formData.append('file', theFile);
      uploadFile(formData, values.type, fileUpload.fileName);
    }
  }, [theFile]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Dialog aria-labelledby="cat-dialog-title" onClose={setOpen} open={open}>
      <DialogTitle id="cat-dialog-title">{t('media:dialog_title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('media:dialog_description')}</DialogContentText>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              autoFocus
              fullWidth
              label={t('media:input_title')}
              margin="dense"
              name="title"
              onChange={onHandleChange}
              value={values.name}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="media-type">{t('media:input_type')}</InputLabel>
              <Select
                labelId="media-type"
                name="type"
                onChange={onHandleChange}
                value={values.type}>
                <MenuItem value="">---</MenuItem>
                {types.map((choice, choiceIdx) => (
                  <MenuItem key={choiceIdx} value={choice}>
                    {choice.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            {values.type === 'video' ? (
              <TextField
                fullWidth
                label={t('media:input_file')}
                margin="dense"
                name="mediaLink"
                onChange={onHandleChange}
                type={values.type === 'video' ? 'text' : 'file'}
                value={values.name}
              />
            ) : (
              // <TextField
              //   fullWidth
              //   margin="dense"
              //   name="mediaLink"
              //   onChange={e => console.log(e.target.files[0])}
              //   type="file"
              // />
              <div
                className={clsx({
                  [classes.dropZone]: true,
                  [classes.dragActive]: isDragActive
                })}
                {...getRootProps()}>
                <input {...getInputProps()} />

                <div>
                  <Typography gutterBottom variant="h3">
                    {fileUpload.loaded
                      ? 'Uploaded file'
                      : t('blog:upload_title')}
                  </Typography>
                  <Typography
                    className={classes.info}
                    color="textSecondary"
                    variant="body1">
                    {fileUpload.loaded
                      ? fileUpload.fileName
                      : t('blog:upload_sub_title')}
                  </Typography>
                </div>
              </div>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              label={t('media:input_description')}
              margin="dense"
              name="description"
              onChange={onHandleChange}
              value={values.description}
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
          onClick={() => addMedia(values)}>
          {loading ? t('blog:btn_loading') : t('blog:btn_save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
