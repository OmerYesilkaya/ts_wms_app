import { JwtPayload } from 'jwt-decode';

type User = {
  nonce: string;
  auth_time: number;
  city: string;
  country: string;
  given_name: string;
  family_name: string;
  emails: string[];
  ver: string;
  oid: string;
  tfp: string;
};

type AuthContext = {
  user: User | null;
  loggingOut: boolean;
  setLoggingOut: React.Dispatch<boolean>;
  logIn: (authToken: string) => void;
  logOut: () => void;
};

interface JwtUserPayload extends JwtPayload, User {}

export type { User, AuthContext, JwtUserPayload };
