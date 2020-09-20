import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import { RichEditor } from 'components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const BlogDetails = props => {
  const { className, editorState, setEditorState, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Blog content details" />
      <CardContent>
        <RichEditor
          editorState={editorState}
          placeholder="The whole content body goes here..."
          setEditorState={setEditorState}
        />
      </CardContent>
    </Card>
  );
};

BlogDetails.propTypes = {
  className: PropTypes.string
};

export default BlogDetails;
