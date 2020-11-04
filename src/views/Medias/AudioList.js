import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, SearchBar } from 'components';
import { AddMediaDialog, Header } from './components';
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
  const [paginator, setPaginator] = useState({ pageSize: 10, pageNumber: 1 });
  const { loading, medias, totalItems } = useSelector(
    ({ mediaGet }) => mediaGet
  );
  useEffect(() => {
    const { pageNumber, pageSize } = paginator;
    getMedias('all', { pageSize, pageNumber });
  }, [paginator]);
  const handleFilter = () => {};
  const handleSearch = () => {};
  const viewMedia = media => {
    const mediaRoute =
      media.type === 'video' ? `/watch/${media.id}` : '/listen';
    router.history.push(mediaRoute);
  };
  const onPageChage = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <Page className={classes.root} title={t('media:name')}>
      <AddMediaDialog
        open={openAddMedia}
        setOpen={() => setOpenAddMedia(false)}
      />
      <Header setOpenAddMedia={() => setOpenAddMedia(true)} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <Grid container>
        <Grid item md={12} xs={12}>
          <CustomisedTable
            className={classes.results}
            columns={mediaColumns(t, viewMedia)}
            data={medias}
            dataCount={totalItems}
            page={paginator.pageNumber}
            pageCount={Math.ceil(totalItems / paginator.pageSize)}
            handlePageChange={onPageChage}
            loading={loading}
            tableTitle={t('media:table_title')}
          />
        </Grid>
      </Grid>
    </Page>
  );
};
export default AudioList;
