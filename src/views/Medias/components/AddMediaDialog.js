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
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { addCategory, getCategories } from 'redux/actions/category';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const types = ['audio', 'video', 'image'];

const initialState = { title: '', description: '', type: '' };
export const AddMediaDialog = ({ open, setOpen }) => {
  const [values, setValues] = useState(initialState);
  const { t } = useTranslation();
  const { loading, loaded } = useSelector(({ categoryAdd }) => categoryAdd);

  useEffect(() => {
    if (loaded) {
      setValues(initialState);
      getCategories();
      setOpen();
    }
    // eslint-disable-next-line
  }, [loaded]);
  const onHandleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
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
            <TextField
              fullWidth
              label={t('media:input_file')}
              margin="dense"
              name="file"
              onChange={onHandleChange}
              type={values.type === 'video' ? 'text' : 'file'}
              value={values.name}
            />
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
          onClick={() => addCategory(values)}>
          {loading ? t('blog:btn_loading') : t('blog:btn_save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
