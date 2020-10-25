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
import { addProduct, editProduct, getProducts } from 'redux/actions/product';

const initialState = { name: '', coverImage: '' };
export const AddProductDialog = ({ open, setOpen, currentProduct = null }) => {
  const [values, setValues] = useState(initialState);
  const { t } = useTranslation();
  const {
    productAdd: { loading, loaded },
    productEdit: { loading: updating, loaded: updated },
    fileUpload: { loaded: done, fileName }
  } = useSelector(({ productAdd, productEdit, fileUpload }) => ({
    productAdd,
    productEdit,
    fileUpload
  }));
  useEffect(() => {
    if (loaded || updated) {
      setValues(initialState);
      getProducts();
      resetUploadedFile();
      setOpen();
    }
    // eslint-disable-next-line
  }, [loaded, updated]);
  useEffect(() => {
    if (currentProduct) {
      const { name, coverImage } = currentProduct;
      setValues({ name, coverImage });
    }
  }, [currentProduct]);
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
      <DialogTitle id="cat-dialog-title">
        {currentProduct
          ? t('product:edit_btn') + currentProduct.name
          : t('product:add_btn')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('product:dialog_description')}</DialogContentText>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <TextField
              autoFocus
              fullWidth
              label={t('product:input_name')}
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
              currentFile={currentProduct ? currentProduct.coverImage : null}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={setOpen}>
          {t('media:btn_cancel')}
        </Button>
        {currentProduct ? (
          <Button
            color="secondary"
            disabled={updating}
            onClick={() => editProduct(currentProduct.id, values)}>
            {updating ? t('blog:btn_loading') : `Update ${currentProduct.name}`}
          </Button>
        ) : (
          <Button
            color="primary"
            disabled={loading}
            onClick={() => addProduct(values)}>
            {loading ? t('blog:btn_loading') : t('media:btn_save')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
