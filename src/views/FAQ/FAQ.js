import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Page } from 'components';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { ContactSupportOutlined as ContactSupportIcon } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { getFAQs } from 'redux/actions/faqs';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  inner: {
    padding: theme.spacing(6, 3),
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto'
  },
  content: {
    marginTop: theme.spacing(6)
  }
}));

const FAQ = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const { loading, faqs } = useSelector(({ faqsGet }) => faqsGet);
  useEffect(() => {
    getFAQs();
  }, []);
  return (
    <Page className={classes.root} title="FAQ">
      <div {...rest} className={clsx(classes.root, className)}>
        <div className={classes.inner}>
          <Typography align="center" variant="h3">
            FAQ
          </Typography>
          <div className={classes.content}>
            <List disablePadding>
              {loading ? (
                <Loading />
              ) : faqs.length ? (
                faqs.map((faq, faqIdx) => (
                  <ListItem key={faqIdx}>
                    <ListItemIcon>
                      <ContactSupportIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={faq.question}
                      primaryTypographyProps={{ variant: 'h5' }}
                      secondary={faq.answer}
                      secondaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))
              ) : (
                <NoDisplayData message={t('faqs:no_data')} />
              )}
            </List>
          </div>
        </div>
      </div>
    </Page>
  );
};

FAQ.propTypes = {
  className: PropTypes.string
};

export default FAQ;
