import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { getTags } from 'redux/actions/tag';
import { AddTagDialog } from './AddTagDialog';
import { getCategories } from 'redux/actions/category';
import { AddCategDialog } from './AddCategDialog';
import { useTranslation } from 'react-i18next';

const AboutBlog = ({ blog, blogTags = [], onHandleChange, onChangeTags }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openAddTag, setOpenAddTag] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const {
    tagGet: { tags },
    categoryGet: { categories }
  } = useSelector(({ tagGet, categoryGet }) => ({ tagGet, categoryGet }));
  useEffect(() => {
    getTags();
    getCategories();
  }, []);
  return (
    <Card className={classes.root}>
      <CardHeader title={t('blog:about_title')} />
      <CardContent>
        <AddTagDialog open={openAddTag} setOpen={() => setOpenAddTag(false)} />
        <AddCategDialog
          open={openAddCategory}
          setOpen={() => setOpenAddCategory(false)}
        />
        <form>
          <div className={classes.formGroup}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label={t('blog:placeholder_title')}
                  name="title"
                  onChange={onHandleChange}
                  value={blog.title}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="blog-category">
                    {t('blog:placeholder_category')}
                  </InputLabel>
                  <Select
                    labelId="blog-category"
                    name="categoryId"
                    onChange={onHandleChange}
                    value={blog.categoryId}>
                    <MenuItem value="">---</MenuItem>
                    {categories.map(({ id, name }, categoryIdx) => (
                      <MenuItem key={categoryIdx} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2} xs={12}>
                <Button
                  className={classes.addButton}
                  onClick={() => setOpenAddCategory(true)}
                  size="small">
                  <AddIcon className={classes.addIcon} />
                  {t('blog:btn_add_category')}
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className={classes.formGroup}>
            <div className={classes.fieldGroup}>
              <Autocomplete
                className={classes.flexGrow}
                filterSelectedOptions
                getOptionLabel={option => option.name}
                multiple
                onChange={onChangeTags}
                options={tags}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={t('blog:placeholder_tags')}
                    placeholder={t('blog:placeholder_tags')}
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
                value={blogTags}
              />
              <Button
                className={classes.addButton}
                onClick={() => setOpenAddTag(true)}
                size="small">
                <AddIcon className={classes.addIcon} />
                {t('blog:btn_add_tag')}
              </Button>
            </div>
            <Typography className={classes.fieldHint} variant="body2">
              {t('blog:tag_alert')}
            </Typography>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

AboutBlog.propTypes = {
  className: PropTypes.string
};

export default AboutBlog;
