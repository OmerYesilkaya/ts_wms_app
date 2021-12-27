import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import authStorage from './storage';
import { UserType } from '@app/types';

export default function useAuth() {
  const { user, setUser, loggingOut, setLoggingOut } = useContext(AuthContext);

  const logIn = (authToken: string) => {
    const user = jwtDecode<UserType>(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    setLoggingOut(true);
    authStorage.removeToken();
  };

  return { user, loggingOut, setLoggingOut, logIn, logOut };
}
