import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page, SearchBar } from 'components';
import { AddMediaDialog, Header } from './components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomisedTable } from 'components/CustomizedTable';

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
  const [openAddMedia, setOpenAddMedia] = useState(false);
  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title={t('media:name')}>
      <AddMediaDialog
        open={openAddMedia}
        setOpen={() => setOpenAddMedia(false)}
      />
      <Header setOpenAddMedia={() => setOpenAddMedia(true)} />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <CustomisedTable tableTitle="Audio list" />
    </Page>
  );
};
export default AudioList;
