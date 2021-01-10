import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ImageCard } from 'components';
import { useSelector } from 'react-redux';
import { getMedias } from 'redux/actions/media';
import { Loading } from 'components/Loading';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useGridStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: '100%',
    [breakpoints.only('xs')]: {
      padding: spacing(1, 2)
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'center',
      padding: spacing(2, 15)
    }
  }
}));

export const HomeImages = React.memo(function HighlightCard() {
  const gridStyles = useGridStyles();
  const { medias, loading } = useSelector(({ mediaGet }) => mediaGet);
  useEffect(() => {
    getMedias('image', { pageSize: 4, byLanguage: 'yes' });
  }, []);
  return (
    <Grid classes={gridStyles} container spacing={2}>
      {loading ? (
        <Loading />
      ) : (
        medias.map((pic, picIdx) => {
          return (
            <Grid item key={picIdx} md={3} sm={12} xs={12}>
              <ImageCard {...pic} />
            </Grid>
          );
        })
      )}
      {medias.length === 4 ? (
        <Button color="primary" component={Link} to="/photos">
          View more
        </Button>
      ) : null}
    </Grid>
  );
});

export default HomeImages;
