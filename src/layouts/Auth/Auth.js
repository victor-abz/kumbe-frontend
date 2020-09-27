import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core'

import { Topbar, Footer } from './components';
import { useStyles } from './styles';
import  useRouter  from 'utils/useRouter';

      
const Auth = props => {
  const { route, t } = props;

  const {location} = useRouter();
  const classes = useStyles();

  return (
    <Fragment>
      <Topbar t={t}/>
      
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes, { t })}
        </Suspense>
      </main>

      {
        location.pathname !== '/login' && location.pathname !== '/register' &&
        <div style={{ marginTop: 10}}>
          <Footer/>
        </div>
      }
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object,
  t: PropTypes.func
};

export default Auth;
