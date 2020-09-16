import React, { Fragment, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/MoreVert';
import bytesToSize from 'utils/bytesToSize';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { UPLOADED_FILE_NAME } from 'utils/constants';
import { uploadFile } from 'redux/actions/file';

const FilesDropzone = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [file, setFile] = useState(null);
  const { loading, loaded, fileName } = useSelector(
    ({ fileUpload }) => fileUpload
  );
  const handleDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);

  const handleRemoveAll = () => {
    setFile(null);
  };
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(UPLOADED_FILE_NAME, fileName);
    }
    // eslint-disable-next-line
  }, [loaded]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/jpeg, image/png'
  });
  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);
    uploadFile(formData);
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className={classes.image}
            src="/images/undraw_add_file2_gvbb.svg"
          />
        </div>
        <div>
          <Typography gutterBottom variant="h3">
            Select file
          </Typography>
          <Typography
            className={classes.info}
            color="textSecondary"
            variant="body1">
            Drop file here or click <Link underline="always">browse</Link>{' '}
            thorough your machine
          </Typography>
        </div>
      </div>
      {file !== null && (
        <Fragment>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              <ListItem key={uuid()}>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondary={bytesToSize(file.size)}
                />
                <Tooltip title="More options">
                  <IconButton edge="end">
                    <MoreIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Button onClick={handleRemoveAll} size="small">
              Remove uploaded
            </Button>
            <Button
              color="secondary"
              disabled={loading || fileName}
              onClick={handleUploadFile}
              size="small"
              variant="contained">
              {loading
                ? 'Uploading,...'
                : fileName
                ? 'File has already uploaded'
                : 'Upload cover image'}
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

FilesDropzone.propTypes = {
  className: PropTypes.string
};

export default FilesDropzone;
