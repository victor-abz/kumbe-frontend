import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, SearchBar } from 'components';
import { AddMediaDialog, AddThumbnailDialog, Header } from './components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomisedTable } from 'components/CustomizedTable';
import { mediaColumns } from './components/columns';
import { getMedias } from 'redux/actions/media';
import { Grid } from '@material-ui/core';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const AudioList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const [openAddMedia, setOpenAddMedia] = useState(false);
  const [openAddThumbnail, setOpenAddThumbnail] = useState(false);
  const [currentMedia, setCurrentMedia] = useState({});
  const { loading, medias } = useSelector(({ mediaGet }) => mediaGet);
  useEffect(() => {
    getMedias();
  }, []);
  const handleFilter = () => {};
  const handleSearch = () => {};
  const watchVideo = video => {
    router.history.push(`/watch/${video.id}`);
  };
  const addThumbnail = media => {
    setCurrentMedia(media);
    setOpenAddThumbnail(true);
  };
  return (
    <Page className={classes.root} title={t('media:name')}>
      <AddMediaDialog
        open={openAddMedia}
        setOpen={() => setOpenAddMedia(false)}
      />
      <AddThumbnailDialog
        media={currentMedia}
        open={openAddThumbnail}
        setOpen={() => setOpenAddThumbnail(false)}
      />
      <Header setOpenAddMedia={() => setOpenAddMedia(true)} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <Grid container>
        <Grid item md={8} xs={12}>
          <CustomisedTable
            className={classes.results}
            columns={mediaColumns(t, watchVideo, addThumbnail)}
            data={medias}
            dataCount={medias.length}
            loading={loading}
            tableTitle={t('media:table_title')}
          />
        </Grid>
      </Grid>
    </Page>
  );
};
export default AudioList;
