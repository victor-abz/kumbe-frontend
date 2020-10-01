import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';

export const mediaColumns = (t, viewVideo, addThum) => [
  { path: 'title', label: t('media:col_title') },
  { path: 'description', label: t('media:col_description') },
  {
    content: item => (
      <Typography variant="body2">{item.type.toUpperCase()}</Typography>
    ),
    label: t('media:col_type')
  },
  {
    label: t('blog:col_actions'),
    content: item => (
      <ButtonGroup aria-label="small outlined button group" size="small">
        <Button onClick={() => viewVideo(item)}>View</Button>
        <Button onClick={() => addThum(item)}>Add thumb</Button>
      </ButtonGroup>
    )
  }
];
