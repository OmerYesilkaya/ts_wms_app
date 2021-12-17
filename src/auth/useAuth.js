import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import authStorage from './storage';

export default function useAuth() {
  const { user, setUser, loggingOut, setLoggingOut } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
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
