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
import { addNewTag, getTags } from 'redux/actions/tag';
import { useSelector } from 'react-redux';
import { ColorPicker } from 'material-ui-color';
 
const initialState = { name: '', color: '' };
export const AddTagDialog = ({ open, setOpen }) => {
  const [values, setValues] = useState(initialState);
  const { loading, loaded } = useSelector(({ tagAdd }) => tagAdd);

  useEffect(() => {
    if (loaded) {
      setValues(initialState);
      getTags();
      setOpen();
    }
    // eslint-disable-next-line
  }, [loaded]);
  const onHandleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  const setTagColor = (e) => {
    console.log(e);
    setValues({ ...values, color: e.css.backgroundColor });
  }

  console.log(values);

  
  return (
    <Dialog aria-labelledby="dialog-title" onClose={setOpen} open={open}>
      <DialogTitle id="dialog-title">Add a new tag</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Note that the tag can be used within the whole system.
        </DialogContentText>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <TextField
              autoFocus
              fullWidth
              label="Tag name"
              margin="dense"
              name="name"
              onChange={onHandleChange}
              value={values.name}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <ColorPicker disableAlpha  name="color" onChange={setTagColor} value={values.color} />
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
          onClick={() => addNewTag(values)}>
          {loading ? 'Saving,...' : 'Save tag'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
AddTagDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};
