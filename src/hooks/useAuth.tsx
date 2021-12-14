import React, { useState, useContext, createContext } from 'react';

import { AuthStorage } from '@app/lib';

import AppLoading from 'expo-app-loading';

import jwtDecode from 'jwt-decode';
import type {
  AuthContext as AuthContextType,
  JwtUserPayload,
  User,
} from '@app/types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const restoreUser = async () => {
    const user = await AuthStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  const logIn = (authToken: string) => {
    const user = jwtDecode<JwtUserPayload>(authToken);
    setUser(user);
    AuthStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    setLoggingOut(true);
    AuthStorage.removeToken();
  };

  return (
    <AuthContext.Provider
      value={{ user, loggingOut, setLoggingOut, logIn, logOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
