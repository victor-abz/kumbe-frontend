import React from 'react';
import { Typography } from '@material-ui/core';

export const mediaColumns = t => [
  { path: 'title', label: t('media:col_title') },
  { path: 'description', label: t('media:col_description') },
  {
    content: item => (
      <Typography variant="body2">{item.type.toUpperCase()}</Typography>
    ),
    label: t('media:col_type')
  }
];
