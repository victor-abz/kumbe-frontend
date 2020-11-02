import React, { useEffect, useState } from 'react';
import { Page, SearchBar } from 'components';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { AddQuestionDialog } from './AddFAQuestionDialog';
import { deleteFAQ, getFAQs } from 'redux/actions/faqs';
import { AlertConfirm } from 'components/AlertConfirm';
import {
  ContactSupportOutlined as ContactSupportIcon,
  EditRounded as EditIcon,
  DeleteForever as DeleteIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(6)
  }
}));

const AdminFAQs = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [currentQtn, setCurrentQtn] = useState(null);
  const {
    faqsGet: { loading, faqs },
    faqRm: { loading: deleting, loaded }
  } = useSelector(({ faqsGet, faqRm }) => ({
    faqsGet,
    faqRm
  }));
  useEffect(() => {
    getFAQs();
  }, []);
  useEffect(() => {
    if (loaded) {
      setConfirmDel(false);
      setCurrentQtn(null);
      getFAQs();
    }
  }, [loaded]);
  const handleFilter = () => {};
  const handleSearch = () => {};
  const onQuestionClick = (qtn, action) => {
    setCurrentQtn(qtn);
    if (action === 'rm') {
      setConfirmDel(true);
    }
    if (action === 'edit') {
      setOpenAddQuestion(true);
    }
  };
  return (
    <Page className={classes.root} title={t('faqs:page_header')}>
      <AddQuestionDialog
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
        message={t('faqs:alert_del')}
        loading={deleting}
        onConfirmYes={() => deleteFAQ(currentQtn.id)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {t('faqs:page_header')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={() => setOpenAddQuestion(true)}
            variant="contained">
            {t('faqs:add_btn')}
          </Button>
        </Grid>
      </Grid>
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      <Grid item sm={8} md={10} className={classes.content}>
        <List disablePadding>
          {loading ? (
            <Loading />
          ) : faqs.length ? (
            faqs.map((faq, faqIdx) => (
              <ListItem key={faqIdx}>
                <ListItemIcon>
                  <ContactSupportIcon />
                  {faqIdx + 1}
                </ListItemIcon>
                <ListItemText
                  primary={faq.question}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondary={faq.answer}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
                <ButtonGroup variant="outlined">
                  <ListItemIcon onClick={() => onQuestionClick(faq, 'edit')}>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemIcon onClick={() => onQuestionClick(faq, 'rm')}>
                    <DeleteIcon />
                  </ListItemIcon>
                </ButtonGroup>
              </ListItem>
            ))
          ) : (
            <NoDisplayData message={t('faqs:no_data')} />
          )}
        </List>
      </Grid>
    </Page>
  );
};
export default AdminFAQs;
