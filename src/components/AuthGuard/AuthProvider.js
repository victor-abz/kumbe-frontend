import React, { useEffect, useState } from 'react';
import { SplashScreen } from './SplashScreen';
import { http, httpSocket } from 'utils/http';
import { AUTH_TOKEN } from 'utils/constants';
import { setUser } from 'redux/actions';

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
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
          setErrorMessage('Be patient, wait a bit');
          setTimeout(() => {
            setLoading(false);
          }, 1000);
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
