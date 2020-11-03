import React, { forwardRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide
} from '@material-ui/core';
import { imagesPath } from 'utils/constants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ViewImage = ({ open, setOpen, mediaLink, imageType }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={setOpen}
      TransitionComponent={Transition}
      aria-labelledby="view-image">
      <DialogContent>
        <img src={`${imagesPath}/${mediaLink}`} alt={imageType} />
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
