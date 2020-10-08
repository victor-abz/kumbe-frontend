import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';

export const mediaColumns = (t, viewMedia) => [
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
            onClick={() => viewMedia(item)}
            variant="contained">
            Watch video
          </Button>
        ) : null}
        {item.type === 'audio' ? (
          <Button
            color="secondary"
            onClick={() => viewMedia(item)}
            variant="outlined">
            Play music
          </Button>
        ) : null}
      </ButtonGroup>
    )
  }
];
