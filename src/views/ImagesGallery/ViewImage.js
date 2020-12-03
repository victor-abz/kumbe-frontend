import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  Slide
} from '@material-ui/core';
import { imagesPath } from 'utils/constants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}));
export const ViewImage = ({ open, setOpen, mediaLink, imageType }) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={setOpen}
      TransitionComponent={Transition}
      aria-labelledby="view-image">
      <CardMedia
        className={classes.media}
        image={`${imagesPath}/${mediaLink}`}
        title={imageType}
      />
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
