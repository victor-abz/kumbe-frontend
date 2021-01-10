import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getFAQs, addFAQ, editFAQ } from 'redux/actions/faqs';

const initialState = { question: '', answer: '' };
export const AddQuestionDialog = ({ open, setOpen, currentItem = null }) => {
  const [values, setValues] = useState(initialState);
  const { t } = useTranslation();
  const {
    faqAdd: { loading, loaded },
    faqEdit: { loading: updating, loaded: updated }
  } = useSelector(({ faqEdit, faqAdd }) => ({ faqEdit, faqAdd }));
  useEffect(() => {
    if (loaded || updated) {
      setValues(initialState);
      getFAQs();
      setOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, updated]);
  useEffect(() => {
    if (currentItem) {
      const { question, answer } = currentItem;
      setValues({ question, answer });
    }
  }, [currentItem]);
  const onHandleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <Dialog aria-labelledby="cat-dialog-title" onClose={setOpen} open={open}>
      <DialogTitle id="cat-dialog-title">
        {currentItem
          ? t('faqs:edit_btn') + currentItem.question.toUpperCase()
          : t('faqs:add_btn')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('faqs:dialog_description')}</DialogContentText>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <TextField
              autoFocus
              fullWidth
              label={t('faqs:input_question')}
              margin="dense"
              name="question"
              onChange={onHandleChange}
              value={values.question}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              label={t('faqs:input_answer')}
              margin="dense"
              name="answer"
              onChange={onHandleChange}
              value={values.answer}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={setOpen}>
          {t('media:btn_cancel')}
        </Button>
        {currentItem ? (
          <Button
            color="secondary"
            disabled={updating}
            onClick={() => editFAQ(currentItem.id, values)}>
            {updating ? t('blog:btn_loading') : 'Update'}
          </Button>
        ) : (
          <Button
            color="primary"
            disabled={loading}
            onClick={() => addFAQ(values)}>
            {loading ? t('blog:btn_loading') : t('media:btn_save')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
