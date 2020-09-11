import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';

import gradients from 'utils/gradients';
import { Page } from 'components';
import { RegisterForm } from './components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.orange,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  registerForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Register = props => {
  const { t, history } = props;
  const classes = useStyles();
  const { loggedIn } = useSelector(({ auth }) => auth);

  const [quote, setQuote] = useState({
    quote:
      "Hella narvwhal Cosby sweater McSweeney's, salvia kitsch before they sold out High Life.",
    background: '/images/auth.png'
  });

  useEffect(() => {
    let mounted = true;
    fetch('https://quotes.rest/qod?category=inspire&language=en')
      .then(res => res.json())
      .then(data => {
        if (mounted) {
          const qt = data.contents.quotes[0];
          setQuote({
            quote: qt.quote,
            background: qt.background,
            author: qt.author
          });
        }
      })
      .catch(console.log);
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (loggedIn) {
      history.goBack();
    }
  }, [loggedIn]);
  return (
    <Page className={classes.root} title={t('auth:register_title')}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PersonAddIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {t('auth:register_form_title')}
          </Typography>
          <Typography variant="subtitle2">
            {t('auth:register_form_subtitle')}
          </Typography>
          <RegisterForm className={classes.registerForm} t={t} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to="/auth/login"
            underline="always"
            variant="subtitle2">
            {t('auth:have_account')}
          </Link>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={quote.background}
          title="Cover">
          <Typography color="inherit" variant="subtitle1">
            {quote.quote}
          </Typography>
          <div className={classes.person}>
            <div>
              <Typography color="inherit" variant="body1">
                {quote.author}
              </Typography>
            </div>
          </div>
        </CardMedia>
      </Card>
    </Page>
  );
};
Register.propTypes = {
  history: PropTypes.func,
  t: PropTypes.func
};

export default Register;
