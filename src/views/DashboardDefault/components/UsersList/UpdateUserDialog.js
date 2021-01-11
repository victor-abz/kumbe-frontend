import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import { changeUserLevel, getUsers } from 'redux/actions/user';
import { notifier } from 'utils/notifier';
import { useSelector } from 'react-redux';

export const UpdateUserDialog = ({ open, setOpen, userInfo = {} }) => {
  const [accessLevel, setAccessLevel] = useState(4);
  const {
    lvlChange: { loading, message, loaded }
  } = useSelector(({ lvlChange }) => ({ lvlChange }));
  useEffect(() => {
    if (userInfo.accessLevel) {
      setAccessLevel(userInfo.accessLevel);
    }
  }, [userInfo]);
  useEffect(() => {
    if (loaded) {
      notifier.success(message);
      getUsers({});
      setOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, message]);
  const levels = [
    // { value: 1, name: 'Administrator' },
    { value: 2, name: 'Modulator' },
    { value: 3, name: 'Editor' },
    { value: 4, name: 'System User' }
  ];
  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle>{`Change access level for ${userInfo.firstName} ${userInfo.lastName}`}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="user-level">User access level</InputLabel>
          <Select
            labelId="user-level"
            id="demo-dialog-select"
            value={accessLevel}
            onChange={({ target }) => setAccessLevel(target.value)}
            input={<Input />}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {levels.map((lvl, lvlIdx) => (
              <MenuItem value={lvl.value} key={lvlIdx}>
                {lvl.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => changeUserLevel({ accessLevel }, userInfo.id)}
          color="primary">
          {loading ? 'Updating user,...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
