import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PropTypes from 'prop-types';

import { Page } from 'components';
import { LoginForm, useStyles } from './components';
import { useSelector } from 'react-redux';

let initialQuote = 'Hella narvwhal Cosby sweater McSweeney, ';
initialQuote += 'salvia kitsch before they sold out High Life.';
const Login = props => {
  const { t, history } = props;
  const classes = useStyles();
  const { loggedIn, user } = useSelector(({ auth }) => auth);

  const [quote, setQuote] = useState({
    quote: initialQuote,
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
      const toRoute =
        Number(user.accessLevel) < 4 ? '/admin/dashboard' : '/user/profile';
      history.push(toRoute);
    }
    // eslint-disable-next-line
  }, [loggedIn]);
  return (
    <Page className={classes.root} style={{ height: '100vh' }} title="Login">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {t('auth:title')}
          </Typography>
          <Typography variant="subtitle2">{t('auth:sub_title')}</Typography>
          <LoginForm className={classes.loginForm} t={t} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to="/register"
            underline="always"
            variant="subtitle2">
            {t('auth:no_account')}
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

Login.propTypes = {
  history: PropTypes.func,
  t: PropTypes.func
};

export default Login;
// 1197770047013008
