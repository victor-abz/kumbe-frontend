import React from 'react';
import { Typography } from '@material-ui/core';

export const NoDisplayData = ({ message = 'No data to display' }) => {
  return (
    <Typography align="center" variant="h4">
      {message}
    </Typography>
  );
};
