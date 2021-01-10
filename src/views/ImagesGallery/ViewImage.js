import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { imagesPath } from 'utils/constants';

const useStyles = makeStyles(() => ({
  media: {
    // height: '100%'
    // paddingTop: '100%' // 16:9
    display: 'block',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0 auto',
    maxWidth: '90%',
    maxHeight: '90%'
  },
  container: {
    display: 'block',
    height: '100vh',
    width: '100vw'
  }
}));
export const ViewImage = ({ open, setOpen, mediaLink, imageType }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="view-image"
      className={classes.container}
      disableEnforceFocus
      onClose={setOpen}
      open={open}>
      <img
        alt={imageType}
        className={classes.media}
        src={`${imagesPath}/${mediaLink}`}
      />
    </Modal>
  );
};
