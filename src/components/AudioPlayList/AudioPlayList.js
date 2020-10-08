import React from 'react';
import { 
  Card, 
  Grid, 
  Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

const useStyles = makeStyles(theme => ({
  root: { 
    backgroundColor: 'black', 
    opacity: '80%',
    marginTop: theme.spacing(0.4),
    padding: theme.spacing(1)
  },
 
  white:{
    color: '#fff'
  },
  selected: {
    position: 'relative',
    backgroundImage: `linear-gradient(to top, transparent, ${theme.palette.primary.dark} 90%)`
  },
}));

const PlayList = ({ track, selectedTrack, isPlaying, setSelectedTrack }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={2} onClick={() => setSelectedTrack(track)}>
      <Grid 
        alignItems="center" 
        className = {track.id === selectedTrack.id
          ? classes.selected
          : ''
        }
        container
        direction="row"
        justify="center"
        spacing={2}
      >
        <Grid item >
          {isPlaying && track.id === selectedTrack.id ? (
            <PauseCircleFilledIcon className={classes.white} fontSize="large" />
          ) : (
            <PlayCircleFilledIcon className={classes.white} fontSize="large" />
          )}
        </Grid>
        <Grid item md={9} sm={9} xs={10}>
          <Typography className={classes.white} component="h2" noWrap variant="h5">
            {track.title}
          </Typography>
          <Typography  color="textSecondary" noWrap	>
            {track.description}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PlayList;
