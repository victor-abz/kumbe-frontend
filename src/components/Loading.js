import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Box } from '@material-ui/core';

const CircularProgressWithLabel = props => {
  return (
    <Box display="inline-flex" position="relative">
      <CircularProgress variant="static" {...props} />
      <Box
        alignItems="center"
        bottom={0}
        display="flex"
        justifyContent="center"
        left={0}
        position="absolute"
        right={0}
        top={0}>
        <Typography
          color="textSecondary"
          component="div"
          variant="caption">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export const Loading = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Typography align="center" variant="h4">
      <CircularProgressWithLabel value={progress} />
    </Typography>
  );
};
