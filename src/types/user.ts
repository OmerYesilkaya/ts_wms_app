type UserType = {
  exp: number;
  nbf: number;
  ver: string;
  iss: string;
  sub: string;
  aud: string;
  nonce: string;
  iat: number;
  auth_time: number;
  oid: string;
  city: string;
  country: string;
  given_name: string;
  family_name: string;
  emails: string[];
  tfp: string;
};

export type { UserType };
