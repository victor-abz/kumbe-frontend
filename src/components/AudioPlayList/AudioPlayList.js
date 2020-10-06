import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import cx from 'clsx';
import WaveSurfer from 'wavesurfer.js';
import {IconButton, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { Column, Row, Item } from '@mui-treasury/components/flex';


const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const AudioPlayList = ({ url, id }) => {
  const flexStyles = useRowFlexStyles();
  const classes = useStyles();
  console.log(url);

  const [isPlaying, setIsPlaying] = useState(false)
  let [waveform, setWaveform] = useState(null)
  
  useEffect(() => {
    setWaveform(WaveSurfer.create({
      container: `#waveform-${id}`,
      scrollParent: true,
      responsive: true,
      cursorColor: 'transparent',
      //   cursorColor: '#ddd',
      waveColor: 'violet',
      progressColor: 'purple',
      mediaControls: true
    }))
  }, [])

  useEffect(() => {
    if(waveform) {
      waveform.load(url)
      waveform.on('ready', updateTimer)
    }
  }, [waveform, url])

  if(waveform) {
    waveform.on('audioprocess', function() {
      if(waveform.isPlaying()) {
        updateTimer()
      }
    });
  }

  const updateTimer= () => {
    var formattedTime = secondsToTimestamp(waveform.getCurrentTime());
    document.getElementById('waveform-time-indicator').innerText = formattedTime;
  }
  
  const secondsToTimestamp = (seconds) => {
    seconds = Math.floor(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds - (h * 3600)) / 60);
    var s = seconds - (h * 3600) - (m * 60);
  
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return h + ':' + m + ':' + s;
  }

  const togglePlayPause = () => {
    waveform.playPause()
    setIsPlaying(!isPlaying)
  }
  return (
    <Card elevation={2} style={{ margin: 10}}>
      <Box
        bgcolor={'grey.100'}
        className={flexStyles.relativeParent}
        minWidth={{ xs: '100%', sm: '100%', md: '100%', lg: '100%' }}
      >
        <Box bgcolor={'primary.light'} className={cx(flexStyles.parent)} height={80} m={1} width={72} >
          <Column gap={1}>
            <Row gap={1}>
              <Item position={'middle'}>
                <span className="time" id="waveform-time-indicator">{'00:00:00'}</span>
              </Item>
            </Row>
          </Column>
        </Box>
        <Box
          className={flexStyles.autoChild}
          id={`waveform-${id}`}
          width={'70%'}
        />
        <Box
          className={cx(flexStyles.autoChild, flexStyles.parent)}
          m={1}
          p={1}
        >
          <div className={classes.controls}>
            <IconButton aria-label="previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause">
              {!isPlaying ? 
                <PlayCircleFilledIcon  onClick={togglePlayPause} /> : 
                <PauseCircleFilledIcon onClick={togglePlayPause} />}
            </IconButton>
            <IconButton aria-label="next">
              <SkipNextIcon />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Card>
  );
};

export default AudioPlayList;