import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';
import Layout, { Root } from '@mui-treasury/layout';

import theme from './theme';
import { store } from './redux/store';
import routes from './routes';
import { ScrollReset, GoogleAnalytics, AuthProvider } from './components';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/index.scss';
import { ToastContainer } from 'react-toastify';
import './i18n';
import { useTranslation } from 'react-i18next';

const scheme = Layout();
scheme.configureEdgeSidebar(builder => {
  builder
    .create('primarySidebar', { anchor: 'left' })
    .registerTemporaryConfig('xs', {
      width: 'auto' // 'auto' is only valid for temporary variant
    });
});

scheme.configureInsetSidebar(builder => {
  builder
    .create('secondarySidebar', { anchor: 'right' })
    .registerAbsoluteConfig('md', {
      top: 0,
      width: 320
    });
});
const history = createBrowserHistory();
// const authToken = localStorage.getItem(AUTH_TOKEN);
// if (authToken) {
//   const tokenInfo = jwtDecode(authToken);
//   const currentTime = Date.now() / 1000;
//   getUserProfile();
//   if (tokenInfo.exp < currentTime) {
//     localStorage.removeItem('token');
//   }
// }
const App = () => {
  const { t } = useTranslation([
    'top_bar',
    'auth',
    'home',
    'forum',
    'error',
    'blog',
    'media',
    'settings',
    'comment',
    'product',
    'partner',
    'faqs',
    'slider'
  ]);
  return (
    <Root scheme={scheme}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router history={history}>
              <AuthProvider>
                <ToastContainer />
                <ScrollReset />
                <GoogleAnalytics />
                {renderRoutes(routes, { t })}
              </AuthProvider>
            </Router>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StoreProvider>
    </Root>
  );
};

export default App;
