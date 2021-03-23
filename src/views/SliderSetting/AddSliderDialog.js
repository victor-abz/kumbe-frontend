import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createSlider, getSliders, editSlider } from 'redux/actions/slider';
import { getCategories } from 'redux/actions/category';
import ColorPicker from 'material-ui-color-picker';
import { FilesDropzone } from 'components';
import { UPLOADED_FILE_NAME } from 'utils/constants';

const initialState = {
  title: '',
  caption: '',
  position: '',
  titleColor: '',
  bgColor: '',
  captionColor: '',
  imageLink: '',
  clickText: '',
  categoryId: ''
};
const positions = ['right', 'left'];
export const AddSliderDialog = ({ open, setOpen, currentItem = null }) => {
  const [values, setValues] = useState(initialState);
  const { t } = useTranslation();
  const {
    categoryGet: { categories },
    fileUpload: { loaded: done, fileName },
    sliderAdd: { loading, loaded: saved },
    sliderEdit: { loading: updating, loaded: updated }
  } = useSelector(({ categoryGet, fileUpload, sliderAdd, sliderEdit }) => ({
    categoryGet,
    fileUpload,
    sliderAdd,
    sliderEdit
  }));
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (saved || updated) {
      localStorage.removeItem(UPLOADED_FILE_NAME);
      setValues(initialState);
      setOpen();
      getSliders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved, updated]);
  useEffect(() => {
    if (currentItem) {
      let {
        id,
        languageId,
        category,
        updatedAt,
        createdAt,
        ...rest
      } = currentItem;
      setValues(rest);
    }
  }, [currentItem]);
  useEffect(() => {
    if (done && fileName) {
      setValues({ ...values, imageLink: fileName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, fileName]);
  const onHandleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <Dialog aria-labelledby="cat-dialog-title" onClose={setOpen} open={open}>
      <DialogTitle id="cat-dialog-title">
        {currentItem
          ? t('slider:edit_btn') + currentItem.title.toUpperCase()
          : t('slider:add_btn')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('slider:dialog_description')}</DialogContentText>
        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              autoFocus
              fullWidth
              label={t('slider:input_title')}
              margin="dense"
              name="title"
              onChange={onHandleChange}
              value={values.title}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <ColorPicker
              defaultValue="Color"
              name="titleColor"
              floatingLabelText={t('slider:input_titleColor')}
              onChange={color => setValues({ ...values, titleColor: color })}
              value={values.titleColor}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="position">
                {t('slider:input_position')}
              </InputLabel>
              <Select
                labelId="position"
                name="position"
                onChange={onHandleChange}
                value={values.position}>
                <MenuItem value="">---</MenuItem>
                {positions.map((position, positionIdx) => (
                  <MenuItem key={positionIdx} value={position}>
                    {position.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <ColorPicker
              defaultValue="Color"
              name="bgColor"
              floatingLabelText={t('slider:input_bgColor')}
              onChange={color => setValues({ ...values, bgColor: color })}
              value={values.bgColor}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              label={t('slider:input_caption')}
              margin="dense"
              name="caption"
              onChange={onHandleChange}
              value={values.caption}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ColorPicker
              defaultValue="Color"
              name="captionColor"
              floatingLabelText={t('slider:input_captionColor')}
              onChange={color => setValues({ ...values, captionColor: color })}
              value={values.captionColor}
            />
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="categoryId">
                {t('slider:input_categoryId')}
              </InputLabel>
              <Select
                labelId="categoryId"
                name="categoryId"
                onChange={onHandleChange}
                value={values.categoryId}>
                <MenuItem value="">---</MenuItem>
                {categories.map((category, categoryIdx) => (
                  <MenuItem key={categoryIdx} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField
              fullWidth
              label={t('slider:input_clickText')}
              margin="dense"
              name="clickText"
              onChange={onHandleChange}
              value={values.clickText}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FilesDropzone
              acceptedFiles="image/jpeg, image/png"
              fileType="image"
              currentFile={currentItem ? currentItem.imageLink : null}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={setOpen}>
          {t('media:btn_cancel')}
        </Button>
        {currentItem ? (
          <Button
            color="secondary"
            disabled={updating}
            onClick={() => editSlider(values, currentItem.id)}>
            {updating ? t('blog:btn_loading') : `Update`}
          </Button>
        ) : (
          <Button
            color="primary"
            disabled={loading}
            onClick={() => createSlider(values)}>
            {loading ? t('blog:btn_loading') : t('media:btn_save')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
