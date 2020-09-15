import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

const types = ['blog', 'forum'];
export const AddCategDialog = ({ open, setOpen, categoryType = 'blog' }) => {
  const initialState = { name: '', type: categoryType };
  const [values, setValues] = useState(initialState);
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
      <DialogTitle id="cat-dialog-title">Add a new category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Note that the category can be used within the whole system.
        </DialogContentText>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              autoFocus
              fullWidth
              label="Category name"
              margin="dense"
              name="name"
              onChange={onHandleChange}
              value={values.name}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="category-type">Category type</InputLabel>
              <Select
                disabled
                labelId="category-type"
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={setOpen}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={loading}
          onClick={() => addCategory(values)}>
          {loading ? 'Saving,...' : 'Save category'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
AddCategDialog.propTypes = {
  categoryType: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func
};
