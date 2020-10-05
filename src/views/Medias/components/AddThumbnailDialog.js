import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getMedias, updateMedia } from 'redux/actions/media';
import { FilesDropzone } from 'components';
import { UPLOADED_FILE_NAME } from 'utils/constants';
import { resetUploadedFile } from 'redux/actions/file';
import { notifier } from 'utils/notifier';

export const AddThumbnailDialog = ({ open, setOpen, media }) => {
  const { t } = useTranslation();
  const {
    fileUpload: { fileName },
    mediaEdit: { loading, loaded: updated, message }
  } = useSelector(({ fileUpload, mediaEdit }) => ({ fileUpload, mediaEdit }));
  useEffect(() => {
    if (updated) {
      getMedias('all');
      localStorage.removeItem(UPLOADED_FILE_NAME);
      resetUploadedFile();
      notifier.success(message);
      setOpen();
    }
  }, [updated]);
  const saveThumbnail = () => {
    if (fileName) {
      updateMedia(media.id, { ...media, thumbnail: fileName });
    }
  };
  return (
    <Dialog aria-labelledby="cat-dialog-title" onClose={setOpen} open={open}>
      <DialogTitle id="cat-dialog-title">
        {`${t('media:add_thumb_title')} ${media.title}`}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <FilesDropzone fileType="thumbnail" />
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
          onClick={() => saveThumbnail()}>
          {loading ? t('blog:btn_loading') : t('media:btn_save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
