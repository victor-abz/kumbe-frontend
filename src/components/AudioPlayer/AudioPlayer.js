import React, { useEffect, useRef, useState } from 'react';
import { 
  IconButton, 
  Card,
  Slider, 
  Grid, 
  CardActions, 
  Box, 
  Hidden,
  Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import cx from 'clsx';

import { audiosPath } from 'utils/constants';
import WaveSurfer from 'wavesurfer.js';

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: 'violet',
  progressColor: 'purple',
  cursorColor: 'purple',
  //   cursorColor: 'transparent',
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 90,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

const useStyles = makeStyles(theme => ({
  root: { 
    backgroundColor: 'black', 
    opacity: '80%'
  },
  actions: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    maxWidth: '60%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  card: {
    zIndex: 1,
    position: 'relative',
    // borderRadius: '1rem',
    boxShadow: '0 6px 20px 0 #dbdbe8',
    backgroundColor: '#fff',
    transition: '0.4s',
    height: '100%',
  },
  white:{
    color: '#fff'
  },
  timer: {
    fontWeight: '900',
    marginLeft : 14
  },
  header: {
    padding: theme.spacing(3),
    // backgroundColor: theme.palette.primary,
    position: 'relative',
    backgroundImage: `linear-gradient(to top, transparent, ${theme.palette.primary.dark} 77%)`
  },
  wave: {
    padding: theme.spacing(3),
    marginTop: -60
  }
}));

export default function AudioPlayer({ track, playing, setPlay }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  //   const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const classes = useStyles();
  const flexStyles = useRowFlexStyles();

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    // setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(`${audiosPath}/${track.mediaLink}`);

    wavesurfer.current.on('ready', function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Update timer
    wavesurfer.current.on('audioprocess', function() {
      if (wavesurfer.current.isPlaying()) {
        updateTimer();
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [track]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e, newValue) => {
    if (newValue) {
      setVolume(newValue);
      wavesurfer.current.setVolume(newValue || 1);
    }
  };

  const updateTimer = () => {
    var formattedTime = secondsToTimestamp(wavesurfer.current.getCurrentTime());
    document.getElementById(
      'waveform-time-indicator'
    ).innerText = formattedTime;
  };

  const secondsToTimestamp = seconds => {
    seconds = Math.floor(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds - h * 3600) / 60);
    var s = seconds - h * 3600 - m * 60;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return h + ':' + m + ':' + s;
  };

  return (
    <Card className={classes.root} elevation={2}>
      <Grid
        alignItems="center"
        className = {classes.header}
        container
        direction="row"
        justify="center"
      >
        <Hidden smDown>
          <Grid item md={6} sm={12}>
            <Typography className={classes.white} component="h2" variant="h5">
              {track.title}
            </Typography>
            <Typography  color="textSecondary" noWrap	>
              {track.description}
            </Typography>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item md={6} sm={12}>
            <Typography className={classes.white} component="h2" variant="h5">
              {track.title}
            </Typography>
            <Typography  color="textSecondary" noWrap	>
              {track.description}
            </Typography>
          </Grid>
        </Hidden>
        
        <Grid
          className={cx(flexStyles.rightChild, flexStyles.parent)}
          m={1}
          p={1}>
          
          <div className={classes.controls}>
            <IconButton aria-label="previous">
              <SkipPreviousIcon className={classes.white} />
            </IconButton>
            <IconButton aria-label="play/pause">
              {!playing ? (
                <PlayCircleFilledIcon className={classes.white} fontSize="large" onClick={handlePlayPause} />
              ) : (
                <PauseCircleFilledIcon className={classes.white} fontSize="large" onClick={handlePlayPause} />
              )}
            </IconButton>
            <IconButton aria-label="next">
              <SkipNextIcon className={classes.white} />
            </IconButton>
          </div>
        </Grid>
      </Grid>

      <Box className={classes.wave} id="waveform" ref={waveformRef} />
      <CardActions disableSpacing>
        <Grid 
          alignItems="center" 
          className={classes.actions} 
          container
          direction="row"
          justify="center"
          spacing={2}
        >
          <Grid item>
            <VolumeDown className={classes.white} />
          </Grid>
          <Grid item xs>
            <Slider 
              aria-labelledby="continuous-slider" 
              defaultValue={volume} 
              max={1}
              // waveSurfer recognize value of `0` same as `1`
              //  so we need to set some zero-ish value for silence
              min={0.01}
              name="volume"
              onChange={onVolumeChange}
              step={.025}
            />
          </Grid>
          <Grid item>
            <VolumeUp className={classes.white} />
          </Grid>
          <Grid className={cx(classes.timer, classes.white)} id="waveform-time-indicator" item>
            {'00:00:00'}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
