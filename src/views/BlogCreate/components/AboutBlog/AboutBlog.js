import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
  Grid
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import { Alert } from 'components';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { getTags } from 'redux/actions/tag';
import { AddTagDialog } from './AddTagDialog';
import { getCategories } from 'redux/actions/category';
import { AddCategDialog } from './AddCategDialog';

const AboutBlog = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
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
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="About this project" />
      <CardContent>
        <AddTagDialog open={openAddTag} setOpen={() => setOpenAddTag(false)} />
        <AddCategDialog
          open={openAddCategory}
          setOpen={() => setOpenAddCategory(false)}
        />
        <form>
          <Alert
            className={classes.alert}
            message="Once you choose the project name you can’t change it unless you contact customer support."
          />
          <div className={classes.formGroup}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Blog Title"
                  name="title"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="blog-category">Category</InputLabel>
                  <Select labelId="blog-category" name="category">
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
                  Add category
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
                options={tags}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Blog tags"
                    placeholder="Select tags"
                    variant="outlined"
                  />
                )}
              />
              <Button
                className={classes.addButton}
                onClick={() => setOpenAddTag(true)}
                size="small">
                <AddIcon className={classes.addIcon} />
                Add an new tag
              </Button>
            </div>
            <Typography className={classes.fieldHint} variant="body2">
              Tags will be colored depending the technology if the system
              recognises.
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
