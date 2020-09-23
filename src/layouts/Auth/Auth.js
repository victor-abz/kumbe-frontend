import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

import { Topbar, Footer } from './components';
import { useStyles } from './styles';

      
const Auth = props => {
  const { route, t } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <Topbar t={t}/>
      <div>
        <main className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes, { t })}
          </Suspense>
        </main>
      </div>
      <div style={{ marginTop: 10}}>
        <Footer/>
      </div>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object,
  t: PropTypes.func
};

export default Auth;
