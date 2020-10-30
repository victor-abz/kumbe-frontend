import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SplashScreen } from './SplashScreen';
import { http, httpSocket } from 'utils/http';
import { AUTH_TOKEN } from 'utils/constants';
import { setUser } from 'redux/actions';

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    // getUserProfile()
  }, []);
  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      http
        .get('/users/profile')
        .then(res => {
          const user = res.data.data;
          setUser(user);
          setLoading(false);
          const name = `${user.firstName} ${user.lastName}`;
          httpSocket.emit('join', { userId: user.id, name }, () => {});
        })
        .catch(error => {
          setErrorMessage('Something went wrong check it out');
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (isLoading) {
    return <SplashScreen message={errorMessage} />;
  }

  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.any
};
