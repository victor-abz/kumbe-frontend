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
  InputLabel,
  Chip
} from '@material-ui/core';
import { addMedia, getMedias } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'components/FilesDropzone/styles';
import { resetUploadedFile, uploadFile } from 'redux/actions/file';
import { Add as AddIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { AddTagDialog } from 'views/BlogCreate/components/AboutBlog/AddTagDialog';
import { getTags } from 'redux/actions/tag';
import { FilesDropzone } from 'components';

const types = ['audio', 'video', 'image'];
const imageTypes = ['Comic', 'Fact Factory'];
const initialState = {
  title: '',
  description: '',
  type: '',
  tags: [],
  mediaLink: '',
  imageType: null
};
export const AddMediaDialog = ({ open, setOpen }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [openAddTag, setOpenAddTag] = useState(false);
  const [theFile, setTheFile] = useState(null);
  const { t } = useTranslation();
  const {
    mediaAdd: { loading, loaded },
    fileUpload: { loaded: done, fileName },
    tagGet: { tags }
  } = useSelector(({ mediaAdd, fileUpload, tagGet }) => ({
    mediaAdd,
    fileUpload,
    tagGet
  }));
  useEffect(() => {
    getTags();
  }, []);
  useEffect(() => {
    if (loaded) {
      setValues(initialState);
      getMedias('all', {});
      resetUploadedFile();
      setOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);
  useEffect(() => {
    if (done && fileName) {
      setTheFile(null);
      setValues({ ...values, mediaLink: fileName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, fileName]);
  const onHandleChange = ({ target: { name, value } }) => {
    const inputName = name ? name : 'tags';
    const inputValue = name ? value : tags.map(({ id }) => id);
    setValues({ ...values, [inputName]: inputValue });
  };
  useEffect(() => {
    if (values.type !== '' && theFile) {
      const formData = new FormData();
      formData.append('file', theFile);
      uploadFile(formData, values.type, fileName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theFile]);
  return (
    <Dialog aria-labelledby="cat-dialog-title" onClose={setOpen} open={open}>
      <AddTagDialog open={openAddTag} setOpen={() => setOpenAddTag(false)} />
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
          {values.type === 'image' ? (
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="media-type">
                  {t('media:input_img_type')}
                </InputLabel>
                <Select
                  labelId="media-type"
                  name="imageType"
                  onChange={onHandleChange}
                  value={values.imageType}>
                  <MenuItem value="">---</MenuItem>
                  {imageTypes.map((imgType, imgTypeIdx) => (
                    <MenuItem key={imgTypeIdx} value={imgType}>
                      {imgType.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : null}
          {values.type !== 'image' ? (
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
          ) : null}
          <Grid item md={12} xs={12}>
            {values.type === 'video' ? (
              <TextField
                fullWidth
                label={t('media:input_file')}
                margin="dense"
                name="mediaLink"
                onChange={onHandleChange}
                value={values.name}
              />
            ) : (
              <FilesDropzone
                acceptedFiles={
                  values.type === 'audio'
                    ? 'audio/mp3, audio/mpeg'
                    : 'image/jpeg, image/png'
                }
                fileType={values.type}
              />
            )}
          </Grid>
          <Grid item md={8} xs={12}>
            <Autocomplete
              className={classes.flexGrow}
              filterSelectedOptions
              getOptionLabel={option => option.name}
              multiple
              onChange={onHandleChange}
              options={tags}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t('media:placeholder_tags')}
                  placeholder={t('media:placeholder_tags')}
                  variant="outlined"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    color="primary"
                    label={option.name}
                    {...getTagProps({ index })}
                    style={{ backgroundColor: option.color, color: '#fff' }}
                  />
                ))
              }
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Button
              className={classes.addButton}
              onClick={() => setOpenAddTag(true)}
              size="small">
              <AddIcon className={classes.addIcon} />
              {t('blog:btn_add_tag')}
            </Button>
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
          {loading ? t('blog:btn_loading') : t('media:btn_save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
