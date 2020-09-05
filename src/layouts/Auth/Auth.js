import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

import { Topbar } from './components';
import { useStyles } from './styles';

      
const Auth = props => {
  const { route, t } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <Topbar t={t}/>
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes, { t })}
        </Suspense>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object,
  t: PropTypes.func
};

export default Auth;
