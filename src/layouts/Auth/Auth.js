import React, { Fragment, Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { LinearProgress, Hidden } from '@material-ui/core'

import { Topbar, Footer, NavBar } from './components';
import { useStyles } from './styles';
import  useRouter  from 'utils/useRouter';

      
const Auth = props => {
  const { route, t } = props;
  const {location} = useRouter();
  const classes = useStyles();

  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <Fragment>
      <Topbar onOpenNavBarMobile={handleNavBarMobileOpen} t={t} />
      <Hidden lgUp>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />      
      </Hidden>
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
