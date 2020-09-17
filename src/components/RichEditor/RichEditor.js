import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  getDefaultKeyBinding
} from 'draft-js';
import { Divider } from '@material-ui/core';

import { EditorToolbar } from './components';
import { blockRenderMap } from './utils';
import { useStyles } from './styles';

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const RichEditor = props => {
  const {
    placeholder,
    editorState,
    setEditorState,
    className,
    ...rest
  } = props;

  const classes = useStyles();

  const editorRef = useRef(null);

  const handleContainerClick = () => {
    editorRef.current.focus();
  };

  const handleToolbarToggle = (type, value) => {
    if (type === 'blockType') {
      if (['left', 'center', 'right', 'justify'].includes(value)) {
        const newContentState = Modifier.setBlockData(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          { 'text-align': value }
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          'change-block-data'
        );

        setEditorState(newEditorState);
        return;
      }

      setEditorState(RichUtils.toggleBlockType(editorState, value));
    } else {
      setEditorState(RichUtils.toggleInlineStyle(editorState, value));
    }
  };

  const handleEditorChange = editorState => {
    setEditorState(editorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleEditorChange(newState);
      return true;
    }

    return false;
  };

  const mapKeyToEditorCommand = event => {
    if (event.keyCode === 9) {
      const newEditorState = RichUtils.onTab(event, editorState, 4);

      if (newEditorState !== editorState) {
        handleEditorChange(newEditorState);
      }

      return;
    }

    return getDefaultKeyBinding(event);
  };

  function blockStyleFn(contentBlock) {
    const textAlign = contentBlock.getData().get('text-align');

    if (textAlign) {
      const className = `textAlign${capitalize(textAlign)}`;

      return classes[className];
    }

    return '';
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <EditorToolbar editorState={editorState} onToggle={handleToolbarToggle} />
      <Divider />
      <div className={classes.editorContainer} onClick={handleContainerClick}>
        <Editor
          blockRenderMap={blockRenderMap}
          blockStyleFn={blockStyleFn}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={handleEditorChange}
          placeholder={placeholder}
          ref={editorRef}
          spellCheck
        />
      </div>
    </div>
  );
};

RichEditor.propTypes = {
  className: PropTypes.string,
  editorState: PropTypes.object,
  placeholder: PropTypes.string,
  setEditorState: PropTypes.func
};

export default RichEditor;
