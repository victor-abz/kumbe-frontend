import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import { FilesDropzone } from 'components';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {}
}));

const BlogCover = props => {
  const { className, currentFile = '', ...rest } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={t('blog:cover_title')} />
      <CardContent>
        <FilesDropzone currentFile={currentFile} fileType="coverImage" />
      </CardContent>
    </Card>
  );
};

BlogCover.propTypes = {
  className: PropTypes.string
};

export default BlogCover;
