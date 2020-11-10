import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Paper, Box } from '@material-ui/core';

import { RichEditor } from 'components';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: { minHeight: '100%' },
  editorContainer: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const BlogDetails = props => {
  const { className, editorState, setEditorState, ...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={t('blog:detail_title')} />
      <CardContent>
        <Paper component={Box} mt={3} className={classes.editorContainer}>
          <RichEditor
            editorState={editorState}
            placeholder={t('blog:placeholder_detail')}
            setEditorState={setEditorState}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};

BlogDetails.propTypes = {
  className: PropTypes.string
};

export default BlogDetails;
