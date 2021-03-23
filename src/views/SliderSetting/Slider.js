import React, { useEffect, useState } from 'react';
import { Page, SearchBar } from 'components';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { AlertConfirm } from 'components/AlertConfirm';
import { AddSliderDialog } from './AddSliderDialog';
import { SliderCard } from './SliderCard';
import { getSliders, deleteSlider } from 'redux/actions/slider';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(6)
  }
}));

const Sliders = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openAddEditSlider, setOpenAddEditSlider] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [currentSlider, setCurrentSlider] = useState(null);
  const {
    slidersGet: { sliders, loading },
    auth: { user },
    sliderRm: { loading: deleting, loaded: deleted }
  } = useSelector(({ slidersGet, auth, sliderRm }) => ({
    slidersGet,
    auth,
    sliderRm
  }));
  useEffect(() => {
    getSliders();
  }, []);
  useEffect(() => {
    if (deleted) {
      getSliders();
      setConfirmDel(false);
    }
  }, [deleted]);
  const handleFilter = () => {};
  const handleSearch = () => {};
  const onSliderClick = (slider, action) => {
    setCurrentSlider(slider);
    if (action === 'rm') {
      setConfirmDel(true);
    }
    if (action === 'edit') {
      setOpenAddEditSlider(true);
    }
  };
  return (
    <Page className={classes.root} title={t('slider:page_header')}>
      <AddSliderDialog
        open={openAddEditSlider}
        currentItem={currentSlider}
        setOpen={() => {
          setCurrentSlider(null);
          setOpenAddEditSlider(false);
        }}
      />
      <AlertConfirm
        open={confirmDel}
        setOpen={() => setConfirmDel(false)}
        message={t('slider:alert_del')}
        loading={deleting}
        onConfirmYes={() => deleteSlider(currentSlider.id)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {t('slider:page_header')}
          </Typography>
        </Grid>
        <Grid item>
          {Number(user.accessLevel) < 3 && (
            <Button
              color="primary"
              onClick={() => setOpenAddEditSlider(true)}
              variant="contained">
              {t('slider:add_btn')}
            </Button>
          )}
        </Grid>
      </Grid>
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        {loading ? (
          <Loading />
        ) : sliders.length ? (
          sliders.map((slider, sliderIdx) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              key={sliderIdx}
              className={classes.content}>
              <SliderCard
                onEdit={() => onSliderClick(slider, 'edit')}
                onDelete={() => onSliderClick(slider, 'rm')}
                canEdit={Number(user.accessLevel) < 3}
                {...slider}
              />
            </Grid>
          ))
        ) : (
          <NoDisplayData />
        )}
      </Grid>
    </Page>
  );
};
export default Sliders;
