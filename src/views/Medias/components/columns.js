import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';

export const mediaColumns = (t, viewVideo) => [
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
        {item.type === 'video' ? (
          <Button
            color="primary"
            onClick={() => viewVideo(item)}
            variant="contained">
            Watch video
          </Button>
        ) : null}
      </ButtonGroup>
    )
  }
];
