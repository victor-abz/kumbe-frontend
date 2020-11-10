import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Editor } from 'react-draft-wysiwyg';
import { makeStyles } from '@material-ui/core';
import { http } from 'utils/http';
import { notifier } from 'utils/notifier';
import { imagesPath } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    '& .rdw-option-wrapper': {
      background: 'transparent',
      border: 'none',
      minWidth: 26,
      padding: 6,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: theme.palette.action.hover
      }
    },
    '& .rdw-option-active': {
      boxShadow: 'none',
      backgroundColor: theme.palette.action.selected
    },
    '& .rdw-dropdown-wrapper': {
      boxShadow: 'none',
      background: 'transparent'
    },
    '& .rdw-dropdown-optionwrapper': {
      overflowY: 'auto',
      boxShadow: theme.shadows[10],
      padding: theme.spacing(1)
    }
  },
  toolbar: {
    marginBottom: 0,
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: 'transparent'
  },
  editor: {
    padding: theme.spacing(2),
    height: 300,
    color: theme.palette.text.primary
  }
}));

const DraftEditor = ({ className, setEditorState, editorState }) => {
  const classes = useStyles();
  const [prevFile, setPrevFile] = useState('');

  const onImageUpload = file => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      const params = prevFile ? `image?prevFile=${prevFile}` : 'image';
      http
        .post(`/upload/${params}`, formData)
        .then(res => {
          const fileName = res.data.data;
          setPrevFile(fileName);
          resolve({ data: { url: `${imagesPath}/${fileName}` } });
        })
        .catch(error => {
          let errorMessage = '';
          if (error.response) {
            const { error: apiError, message } = error.response.data;
            errorMessage = apiError || message;
          } else {
            errorMessage = error.message;
          }
          notifier.error(errorMessage);
          reject(errorMessage);
        });
    });
  };
  return (
    <Editor
      wrapperClassName={clsx(classes.root, className)}
      toolbarClassName={classes.toolbar}
      editorClassName={classes.editor}
      onEditorStateChange={setEditorState}
      editorState={editorState}
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: {
          uploadCallback: onImageUpload,
          alt: { present: true, mandatory: true },
          defaultSize: { height: 300, width: 500 }
        }
      }}
    />
  );
};

DraftEditor.propTypes = {
  className: PropTypes.string
};

export default DraftEditor;
