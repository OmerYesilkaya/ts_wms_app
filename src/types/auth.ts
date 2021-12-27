import { SetStateAction } from 'react';
import { UserType } from '.';

type AuthContext = {
  user: UserType | null;
  setUser: React.Dispatch<SetStateAction<UserType | null>>;
  loggingOut: boolean;
  setLoggingOut: React.Dispatch<SetStateAction<boolean>>;
};

export type { AuthContext };
