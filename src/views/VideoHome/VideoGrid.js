import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { VideoGridItem } from 'components';
import { getMedias } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { Page, Paginate, SearchBar } from 'components';
import { Header } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3, 10),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: theme.typography.fontWeightBold,
  },
  results: {
    marginTop: theme.spacing(3)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const VideoGrid = () => {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);


  const {
    mediaGet: { loading: mediasLoading, medias }
  } = useSelector(({ mediaGet }) => ({ mediaGet }));

  useEffect(() => {
    getMedias('video');
  }, []);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page
      className={classes.root}
      title="Watch Videos"
    >
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      <div className={classes.results}>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="body2"
        >
          {medias.length} Records found. Page {page + 1} of {' '} 
          {Math.ceil(medias.length / rowsPerPage)}
        </Typography>
        <Grid container spacing={3}>
          {mediasLoading ? <Loading /> : 
            medias.length > 0 &&
          <>
            {medias.map((item) => (
              <Grid item key={item.id} lg={3} md={4} sm={6} xs={12}>
                <VideoGridItem {...item} />
              </Grid>
            ))}
          </>
          }
        </Grid>
      </div>
      <div className={classes.paginate}>
        <Paginate pageCount={1} />
      </div>
    </Page>
  );
};

export default VideoGrid;
