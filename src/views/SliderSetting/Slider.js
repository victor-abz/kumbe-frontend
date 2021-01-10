import React, { useEffect, useState } from 'react';
import { Page, SearchBar } from 'components';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { deleteFAQ, getFAQs } from 'redux/actions/faqs';
import { AlertConfirm } from 'components/AlertConfirm';
import {
  ContactSupportOutlined as ContactSupportIcon,
  EditRounded as EditIcon,
  DeleteForever as DeleteIcon
} from '@material-ui/icons';
import { AddSliderDialog } from './AddSliderDialog';
import { SliderCard } from './SliderCard';
import { getSliders } from 'redux/actions/slider';

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
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [currentQtn, setCurrentQtn] = useState(null);
  const {
    slidersGet: { sliders, loading }
  } = useSelector(({ slidersGet }) => ({ slidersGet }));
  useEffect(() => {
    getSliders();
  }, []);
  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title={t('slider:page_header')}>
      <AddSliderDialog
        open={openAddQuestion}
        currentItem={currentQtn}
        setOpen={() => {
          setCurrentQtn(null);
          setOpenAddQuestion(false);
        }}
      />
      <AlertConfirm
        open={confirmDel}
        setOpen={() => setConfirmDel(false)}
        message={t('slider:alert_del')}
        onConfirmYes={() => deleteFAQ(currentQtn.id)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {t('slider:page_header')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={() => setOpenAddQuestion(true)}
            variant="contained">
            {t('slider:add_btn')}
          </Button>
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
              <SliderCard {...slider} />
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
