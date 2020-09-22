import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import { RichEditor } from 'components';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {}
}));

const BlogDetails = props => {
  const { className, editorState, setEditorState, ...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={t('blog:detail_title')} />
      <CardContent>
        <RichEditor
          editorState={editorState}
          placeholder={t('blog:placeholder_detail')}
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
