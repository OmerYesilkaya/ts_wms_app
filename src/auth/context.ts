import React from 'react';
import type { AuthContext as AuthContextType } from '@app/types';

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
