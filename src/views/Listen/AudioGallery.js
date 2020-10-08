import React, { useEffect, useState } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { AudioPlayList, AudioPlayer } from 'components';
import { useStyles } from './style';
import { getMedias } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';


const tracks = [
  {
    id: 0,
    title: 'Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Franz Schubert\'s Ständchen - Voice (Clarinet) & Piano',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  },
  {
    id: 0,
    title: 'Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Franz Schubert\'s Ständchen - Voice (Clarinet) & Piano',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  },
  {
    id: 0,
    title: 'Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Franz Schubert\'s Ständchen - Voice (Clarinet) & Piano',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  },
  {
    id: 0,
    title: 'Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Franz Schubert\'s Ständchen - Voice (Clarinet) & Piano',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  },
  {
    id: 0,
    title: 'Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Franz Schubert\'s Ständchen - Voice (Clarinet) & Piano',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  },
  {
    id: 0,
    title: 'Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Franz Schubert\'s Ständchen - Voice (Clarinet) & Piano',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  },
  {
    id: 0,
    title: 'Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Franz Schubert\'s Ständchen - Voice (Clarinet) & Piano',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  },
  {
    id: 0,
    title: 'Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Franz Schubert\'s Ständchen - Voice (Clarinet) & Piano',
    mediaLink:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  }
];

const AudioGallery = () => {

  const [isPlaying, setPlay] = useState(false);
  const classes = useStyles();
  const {
    mediaGet: { loading: mediasLoading, loaded,  medias: AudioList },
  } = useSelector(( { mediaGet }) => ({
    mediaGet
  }));

  const [selectedTrack, setSelectedTrack] = useState({});

  useEffect(()=> {
    if( loaded) {
      setSelectedTrack(AudioList[0])
    }
  }, [loaded])

  useEffect(() => {
    getMedias('audio');
  }, []);

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.videoSection} item md xs={12}>
        {mediasLoading ? (
          <Loading />
        ) : loaded && AudioList.length ? <AudioPlayer playing={isPlaying} setPlay={setPlay} track={selectedTrack} />:null
        }
      </Grid>
      <Grid className={classes.relatedVideo} item md={'auto'} xs={12}>
        {mediasLoading || AudioList.length === 0 ? (
          <Loading />
        ) : (
          <Grid style={{ maxHeight : 300, height: 300, overflow: 'scroll'}}>
            <Typography
              className={classes.relatedTitle}
              component="h2"
              variant="h4">
              Up next
            </Typography>
            <Divider className={classes.divider} />
            {AudioList.map(track => (<AudioPlayList
              handlePlayPause
              isPlaying={isPlaying}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              track={track}
            />))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default AudioGallery;
